class MoviePosterCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._hass = null;
    this._slideInterval = null;
    this._progressInterval = null;
    this._currentPosterIndex = 0;
    this._posterFiles = [];
    this._loadingPosters = false;
  }

  setConfig(config) {
    if (!config.media_player) {
      throw new Error('You must specify a media_player entity');
    }

    this._config = {
      media_player: config.media_player,
      poster_path: config.poster_path || '/local/posters',
      poster_folder: config.poster_folder || '/media/posters',
      posters: config.posters || [],
      auto_load_folder: config.auto_load_folder !== false,
      poster_order: config.poster_order || 'random', // 'random' or 'sequential'
      slide_interval: (config.slide_interval || 30) * 1000,
      show_time: config.show_time !== false,
      show_weather: config.show_weather || false,
      weather_entity: config.weather_entity || '',
      show_now_playing_text: config.show_now_playing_text !== false,
      idle_timeout: (config.idle_timeout || 300) * 1000,
      transition_duration: config.transition_duration || 1000,
      poster_fit: config.poster_fit || 'cover',
      title: config.title || 'Movie Collection',
      layout: config.layout || 'landscape', // 'landscape' or 'portrait'
      fullscreen: config.fullscreen || false,
      hide_toolbar: config.hide_toolbar || false,
      time_position: config.time_position || 'top-right',
      weather_position: config.weather_position || 'top-right',
      time_style: config.time_style || {},
      weather_style: config.weather_style || {},
      widget_style: config.widget_style || 'glass', // 'glass', 'solid', 'minimal'
      ...config
    };

    // Load posters from folder if enabled
    if (this._config.auto_load_folder && this._config.poster_folder) {
      this._loadPostersFromFolder();
    } else if (this._config.posters.length === 0) {
      console.warn('Movie Poster Card: No posters configured. Please set poster_folder or posters array.');
    }

    this._startSlideshow();
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    
    // Auto-load posters from folder on first hass set
    if (this._config.auto_load_folder && this._config.poster_folder && this._posterFiles.length === 0) {
      this._loadPostersFromFolder();
    }
    
    // Check if media player state changed
    const oldState = oldHass ? oldHass.states[this._config.media_player] : null;
    const newState = hass ? hass.states[this._config.media_player] : null;
    
    // Start/stop progress updates based on playback state
    if (newState && newState.state === 'playing') {
      this._startProgressUpdates();
    } else {
      this._stopProgressUpdates();
    }
    
    this.render();
  }

  async _loadPostersFromFolder() {
    if (this._loadingPosters) return;
    this._loadingPosters = true;

    try {
      // If manual posters list is provided, use it directly
      if (this._config.posters && this._config.posters.length > 0) {
        this._posterFiles = [...this._config.posters];
        
        // Shuffle if random order
        if (this._config.poster_order === 'random') {
          this._shuffleArray(this._posterFiles);
        }
        
        this._loadingPosters = false;
        this.render();
        return;
      }

      // Auto-discover posters from folder
      const folderPath = this._config.poster_folder;
      
      // Try to use the media browser API to list files
      try {
        const mediaPath = folderPath.replace('/media/', '').replace('/local/', 'www/');
        const result = await this._hass.callWS({
          type: 'media_source/browse_media',
          media_content_id: `media-source://media_source/${mediaPath}`
        });

        if (result && result.children) {
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
          const posterList = result.children
            .filter(child => {
              const ext = child.title.toLowerCase().substring(child.title.lastIndexOf('.'));
              return imageExtensions.includes(ext);
            })
            .map(child => {
              // Convert media content ID to accessible URL
              if (folderPath.startsWith('/media/')) {
                return `/media/${mediaPath}/${child.title}`;
              } else {
                return `/local/${child.title}`;
              }
            });

          if (posterList.length > 0) {
            this._posterFiles = posterList;
            
            // Shuffle if random order
            if (this._config.poster_order === 'random') {
              this._shuffleArray(this._posterFiles);
            }
            
            this._loadingPosters = false;
            this.render();
            return;
          }
        }
      } catch (apiError) {
        console.log('Media browser API not available, using fallback method:', apiError);
      }

      // Fallback: Try common naming patterns
      const extensions = ['jpg', 'jpeg', 'png', 'webp'];
      const posterList = [];
      
      // Try numbered posters: poster1.jpg, poster2.jpg, etc.
      for (let i = 1; i <= 100; i++) {
        for (const ext of extensions) {
          posterList.push(`${folderPath}/poster${i}.${ext}`);
        }
      }
      
      // Try common movie poster naming patterns
      const commonNames = [
        'poster', 'cover', 'artwork', 'thumb', 'thumbnail',
        'movie', 'film', 'cinema', 'image', 'photo'
      ];
      
      for (const name of commonNames) {
        for (let i = 1; i <= 20; i++) {
          for (const ext of extensions) {
            posterList.push(`${folderPath}/${name}${i}.${ext}`);
            posterList.push(`${folderPath}/${name}_${i}.${ext}`);
            posterList.push(`${folderPath}/${name}-${i}.${ext}`);
          }
        }
      }
      
      this._posterFiles = posterList;
      
      // Shuffle if random order
      if (this._config.poster_order === 'random') {
        this._shuffleArray(this._posterFiles);
      }
      
    } catch (error) {
      console.error('Error loading posters from folder:', error);
      this._posterFiles = this._config.posters || [];
    }
    
    this._loadingPosters = false;
    this.render();
  }

  _shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  connectedCallback() {
    this._startSlideshow();
    if (this._config.fullscreen) {
      this._setupFullscreen();
    }
    // Start progress updates if already playing
    if (this._isMediaPlaying()) {
      this._startProgressUpdates();
    }
  }

  disconnectedCallback() {
    this._stopSlideshow();
    this._stopProgressUpdates();
  }

  _setupFullscreen() {
    if (this.parentElement) {
      this.parentElement.style.height = '100vh';
      this.parentElement.style.width = '100vw';
    }
  }

  _startSlideshow() {
    this._stopSlideshow();
    const posterSource = this._posterFiles.length > 0 ? this._posterFiles : this._config.posters;
    
    if (posterSource && posterSource.length > 1) {
      this._slideInterval = setInterval(() => {
        if (!this._isMediaPlaying()) {
          this._currentPosterIndex = (this._currentPosterIndex + 1) % posterSource.length;
          this.render();
        }
      }, this._config.slide_interval);
    }
  }

  _stopSlideshow() {
    if (this._slideInterval) {
      clearInterval(this._slideInterval);
      this._slideInterval = null;
    }
  }

  _startProgressUpdates() {
    this._stopProgressUpdates();
    
    // Update progress bar every second while playing
    this._progressInterval = setInterval(() => {
      if (this._isMediaPlaying()) {
        this._updateProgressBar();
      } else {
        this._stopProgressUpdates();
      }
    }, 1000);
  }

  _stopProgressUpdates() {
    if (this._progressInterval) {
      clearInterval(this._progressInterval);
      this._progressInterval = null;
    }
  }

  _updateProgressBar() {
    const mediaPlayer = this._getMediaPlayerState();
    if (!mediaPlayer) return;

    const mediaDuration = mediaPlayer.attributes?.media_duration || 0;
    const mediaPosition = mediaPlayer.attributes?.media_position || 0;
    const updatedAt = mediaPlayer.attributes?.media_position_updated_at;

    if (mediaDuration > 0 && mediaPosition >= 0 && updatedAt) {
      // Calculate current position based on last update time
      const now = new Date().getTime() / 1000;
      const updatedAtTime = new Date(updatedAt).getTime() / 1000;
      const elapsedSinceUpdate = now - updatedAtTime;
      
      // Only add elapsed time if media is playing (not paused)
      const currentPosition = mediaPlayer.state === 'playing' 
        ? Math.min(mediaPosition + elapsedSinceUpdate, mediaDuration)
        : mediaPosition;

      const progressPercent = (currentPosition / mediaDuration) * 100;

      // Update progress bar and time displays
      const progressFill = this.shadowRoot.querySelector('.progress-fill');
      const currentTimeEl = this.shadowRoot.querySelector('.current-time');
      
      if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
      }
      
      if (currentTimeEl) {
        currentTimeEl.textContent = this._formatTime(currentPosition);
      }
    }
  }

  _isMediaPlaying() {
    if (!this._hass || !this._config.media_player) return false;
    const entity = this._hass.states[this._config.media_player];
    return entity && (entity.state === 'playing' || entity.state === 'paused');
  }

  _getMediaPlayerState() {
    if (!this._hass || !this._config.media_player) return null;
    return this._hass.states[this._config.media_player];
  }

  _getWeatherState() {
    if (!this._hass || !this._config.weather_entity) return null;
    return this._hass.states[this._config.weather_entity];
  }

  _formatTime(seconds) {
    if (!seconds || seconds < 0) return '0:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  _formatRuntime(seconds) {
    if (!seconds) return '';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
  }

  _getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  _getWeatherIcon(condition) {
    const iconMap = {
      'clear-night': '🌙',
      'cloudy': '☁️',
      'fog': '🌫️',
      'hail': '🌨️',
      'lightning': '⛈️',
      'lightning-rainy': '⛈️',
      'partlycloudy': '⛅',
      'pouring': '🌧️',
      'rainy': '🌧️',
      'snowy': '❄️',
      'snowy-rainy': '🌨️',
      'sunny': '☀️',
      'windy': '💨',
      'windy-variant': '💨',
    };
    return iconMap[condition] || '☀️';
  }

  _getPositionStyles(position) {
    const positions = {
      'top-left': 'top: 2rem; left: 2rem;',
      'top-right': 'top: 2rem; right: 2rem;',
      'bottom-left': 'bottom: 2rem; left: 2rem;',
      'bottom-right': 'bottom: 2rem; right: 2rem;',
      'top-center': 'top: 2rem; left: 50%; transform: translateX(-50%);',
      'bottom-center': 'bottom: 2rem; left: 50%; transform: translateX(-50%);',
    };
    return positions[position] || positions['top-right'];
  }

  _getWidgetBaseStyles() {
    const styles = {
      glass: `
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(30px);
        border: 1px solid rgba(255, 255, 255, 0.15);
      `,
      solid: `
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.1);
      `,
      minimal: `
        background: transparent;
        border: none;
      `
    };
    return styles[this._config.widget_style] || styles.glass;
  }

  _getUserStyles(styleObj) {
    return Object.entries(styleObj)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ');
  }

  _getCalculatedMediaPosition() {
    const mediaPlayer = this._getMediaPlayerState();
    if (!mediaPlayer) return 0;

    const mediaPosition = mediaPlayer.attributes?.media_position || 0;
    const updatedAt = mediaPlayer.attributes?.media_position_updated_at;

    if (!updatedAt || mediaPlayer.state !== 'playing') {
      return mediaPosition;
    }

    // Calculate current position based on last update time
    const now = new Date().getTime() / 1000;
    const updatedAtTime = new Date(updatedAt).getTime() / 1000;
    const elapsedSinceUpdate = now - updatedAtTime;
    
    return mediaPosition + elapsedSinceUpdate;
  }

  render() {
    if (!this._hass || !this._config) return;

    const mediaPlayer = this._getMediaPlayerState();
    const isPlaying = this._isMediaPlaying();
    const weather = this._getWeatherState();

    const posterSource = this._posterFiles.length > 0 ? this._posterFiles : this._config.posters;
    const posterUrl = posterSource[this._currentPosterIndex] || '';
    const mediaArt = mediaPlayer?.attributes?.entity_picture || '';
    const mediaTitle = mediaPlayer?.attributes?.media_title || '';
    const mediaDuration = mediaPlayer?.attributes?.media_duration || 0;
    const mediaPosition = this._getCalculatedMediaPosition();
    const progressPercent = mediaDuration > 0 ? Math.min((mediaPosition / mediaDuration) * 100, 100) : 0;

    const isLandscape = this._config.layout === 'landscape';
    const isPortrait = this._config.layout === 'portrait';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .container {
          position: relative;
          width: 100%;
          height: 100%;
          background: #000;
          overflow: hidden;
          ${this._config.fullscreen ? 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999;' : ''}
        }

        ${this._config.hide_toolbar ? `
          :host {
            margin: -8px;
          }
        ` : ''}

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: ${this._config.poster_fit};
          background-position: center;
          transition: opacity ${this._config.transition_duration}ms ease-in-out,
                      transform ${this._config.transition_duration}ms ease-in-out;
          will-change: opacity, transform;
        }

        .background.poster {
          background-image: url('${posterUrl}');
          opacity: ${isPlaying ? 0 : 1};
          transform: scale(${isPlaying ? 1.1 : 1});
          filter: ${isPlaying ? 'blur(20px)' : 'none'};
        }

        .background.media {
          background-image: url('${mediaArt}');
          opacity: ${isPlaying ? 1 : 0};
          transform: scale(${isPlaying ? 1 : 1.1});
        }

        .background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.3) 30%,
            rgba(0, 0, 0, 0.3) 70%,
            rgba(0, 0, 0, 0.9) 100%
          );
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: ${this._config.hide_toolbar ? '1rem' : '2rem'};
          box-sizing: border-box;
          z-index: 10;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          opacity: ${isPlaying ? 1 : 0.7};
          transition: opacity 0.5s ease;
          position: relative;
        }

        .now-playing {
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          padding: 0.5rem 1.2rem;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          opacity: ${isPlaying && this._config.show_now_playing_text ? 1 : 0};
          transform: translateY(${isPlaying && this._config.show_now_playing_text ? 0 : '-20px'});
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .time-widget {
          position: fixed;
          ${this._getPositionStyles(this._config.time_position)}
          ${this._getWidgetBaseStyles()}
          padding: 0.6rem 1.2rem;
          border-radius: 18px;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
          letter-spacing: 0.3px;
          z-index: 100;
          ${this._getUserStyles(this._config.time_style)}
        }

        .weather-widget {
          position: fixed;
          ${this._getPositionStyles(this._config.weather_position)}
          ${this._getWidgetBaseStyles()}
          padding: 0.6rem 1.2rem;
          border-radius: 18px;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 100;
          ${this._getUserStyles(this._config.weather_style)}
        }

        .weather-icon {
          font-size: 1.3rem;
        }

        .bottom-section {
          opacity: ${isPlaying ? 1 : 0};
          transform: translateY(${isPlaying ? 0 : '30px'});
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .media-info {
          margin-bottom: 1.5rem;
        }

        .media-title {
          font-size: ${isPortrait ? '2rem' : '2.5rem'};
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.5rem 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          line-height: 1.2;
        }

        .media-meta {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .progress-container {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 1.2rem 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .progress-time {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.9) 100%);
          border-radius: 3px;
          width: ${progressPercent}%;
          transition: width 0.3s ease;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }

        .poster-title {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          right: 2rem;
          opacity: ${isPlaying ? 0 : 1};
          transition: opacity 0.5s ease;
        }

        .poster-title h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
        }

        ${isPortrait ? `
          .overlay {
            padding: 1.5rem;
          }
          
          .media-title {
            font-size: 1.8rem;
          }
          
          .bottom-section {
            max-width: 100%;
          }
        ` : ''}

        ${isLandscape ? `
          .media-info {
            max-width: 70%;
          }
        ` : ''}

        @media (max-width: 768px) {
          .media-title {
            font-size: 1.8rem;
          }
          
          .overlay {
            padding: 1.5rem;
          }
          
          .time-widget, .weather-widget {
            font-size: 0.85rem;
            padding: 0.5rem 1rem;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>

      <div class="container">
        <div class="background poster"></div>
        <div class="background media"></div>
        
        ${this._config.show_time ? `
          <div class="time-widget">${this._getCurrentTime()}</div>
        ` : ''}
        
        ${this._config.show_weather && weather ? `
          <div class="weather-widget">
            <span class="weather-icon">${this._getWeatherIcon(weather.state)}</span>
            <span>${Math.round(weather.attributes.temperature)}°</span>
          </div>
        ` : ''}
        
        <div class="overlay">
          <div class="top-bar">
            <div class="now-playing">Now Playing</div>
          </div>

          <div class="bottom-section">
            <div class="media-info">
              <h1 class="media-title">${mediaTitle}</h1>
              <div class="media-meta">
                ${mediaDuration > 0 ? `<span>${this._formatRuntime(mediaDuration)}</span>` : ''}
                ${mediaPlayer?.attributes?.media_content_type ? `<span>${mediaPlayer.attributes.media_content_type}</span>` : ''}
              </div>
            </div>

            ${mediaDuration > 0 ? `
              <div class="progress-container">
                <div class="progress-time">
                  <span class="current-time">${this._formatTime(mediaPosition)}</span>
                  <span>${this._formatTime(mediaDuration)}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill"></div>
                </div>
              </div>
            ` : ''}
          </div>

          ${!isPlaying && this._config.title ? `
            <div class="poster-title">
              <h2>${this._config.title}</h2>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  getCardSize() {
    return this._config.fullscreen ? 0 : 5;
  }

  static getConfigElement() {
    return document.createElement('movie-poster-card-editor');
  }

  static getStubConfig() {
    return {
      media_player: 'media_player.apple_tv',
      poster_path: '/local/posters',
      poster_folder: '/media/posters',
      auto_load_folder: true,
      poster_order: 'random',
      posters: [],
      slide_interval: 30,
      show_time: true,
      show_weather: false,
      weather_entity: '',
      title: 'Movie Collection',
      layout: 'landscape',
      fullscreen: false,
      hide_toolbar: false,
      time_position: 'top-right',
      weather_position: 'top-right',
      widget_style: 'glass'
    };
  }
}

customElements.define('movie-poster-card', MoviePosterCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'movie-poster-card',
  name: 'Movie Poster Card',
  description: 'Display movie posters with Apple TV integration',
  preview: true,
  documentationURL: 'https://github.com/yourusername/movie-poster-card',
});
