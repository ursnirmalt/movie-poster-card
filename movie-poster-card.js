class MoviePosterCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
    this._hass = null;
    this._slideInterval = null;
    this._currentPosterIndex = 0;
  }

  setConfig(config) {
    if (!config.media_player) {
      throw new Error('You must specify a media_player entity');
    }

    this._config = {
      media_player: config.media_player,
      poster_path: config.poster_path || '/local/posters',
      posters: config.posters || [],
      slide_interval: (config.slide_interval || 30) * 1000,
      show_time: config.show_time !== false,
      show_weather: config.show_weather || false,
      weather_entity: config.weather_entity || '',
      show_now_playing_text: config.show_now_playing_text !== false,
      idle_timeout: (config.idle_timeout || 300) * 1000,
      transition_duration: config.transition_duration || 1000,
      poster_fit: config.poster_fit || 'cover',
      title: config.title || 'Movie Collection',
      ...config
    };

    this._startSlideshow();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  connectedCallback() {
    this._startSlideshow();
  }

  disconnectedCallback() {
    this._stopSlideshow();
  }

  _startSlideshow() {
    this._stopSlideshow();
    if (this._config.posters && this._config.posters.length > 1) {
      this._slideInterval = setInterval(() => {
        if (!this._isMediaPlaying()) {
          this._currentPosterIndex = (this._currentPosterIndex + 1) % this._config.posters.length;
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
    if (!seconds) return '0:00';
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

  render() {
    if (!this._hass || !this._config) return;

    const mediaPlayer = this._getMediaPlayerState();
    const isPlaying = this._isMediaPlaying();
    const weather = this._getWeatherState();

    const posterUrl = this._config.posters[this._currentPosterIndex] || '';
    const mediaArt = mediaPlayer?.attributes?.entity_picture || '';
    const mediaTitle = mediaPlayer?.attributes?.media_title || '';
    const mediaDuration = mediaPlayer?.attributes?.media_duration || 0;
    const mediaPosition = mediaPlayer?.attributes?.media_position || 0;
    const progressPercent = mediaDuration > 0 ? (mediaPosition / mediaDuration) * 100 : 0;

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
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
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
          padding: 2rem;
          box-sizing: border-box;
          z-index: 10;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          opacity: ${isPlaying ? 1 : 0.7};
          transition: opacity 0.5s ease;
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

        .info-cluster {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .time-widget, .weather-widget {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(30px);
          padding: 0.6rem 1.2rem;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
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
          font-size: 2.5rem;
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

        @media (max-width: 768px) {
          .media-title {
            font-size: 1.8rem;
          }
          
          .overlay {
            padding: 1.5rem;
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

        .animate-in {
          animation: slideIn 0.8s ease;
        }
      </style>

      <div class="container">
        <div class="background poster"></div>
        <div class="background media"></div>
        
        <div class="overlay">
          <div class="top-bar">
            <div class="now-playing">Now Playing</div>
            <div class="info-cluster">
              ${this._config.show_time ? `
                <div class="time-widget">${this._getCurrentTime()}</div>
              ` : ''}
              ${this._config.show_weather && weather ? `
                <div class="weather-widget">
                  <span class="weather-icon">${this._getWeatherIcon(weather.state)}</span>
                  <span>${Math.round(weather.attributes.temperature)}°</span>
                </div>
              ` : ''}
            </div>
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
                  <span>${this._formatTime(mediaPosition)}</span>
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
    return 5;
  }

  static getConfigElement() {
    return document.createElement('movie-poster-card-editor');
  }

  static getStubConfig() {
    return {
      media_player: 'media_player.apple_tv',
      poster_path: '/local/posters',
      posters: [],
      slide_interval: 30,
      show_time: true,
      show_weather: false,
      weather_entity: '',
      title: 'Movie Collection'
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
