class MoviePosterCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this.render();
  }

  configChanged(newConfig) {
    const event = new Event('config-changed', {
      bubbles: true,
      composed: true,
    });
    event.detail = { config: newConfig };
    this.dispatchEvent(event);
  }

  render() {
    if (!this._config) return;

    this.innerHTML = `
      <style>
        .card-config {
          padding: 16px;
        }
        
        .config-row {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .config-label {
          flex: 1;
          font-weight: 500;
        }
        
        .config-input {
          flex: 2;
        }
        
        input, select {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--divider-color);
          border-radius: 4px;
          background: var(--primary-background-color);
          color: var(--primary-text-color);
        }
        
        .switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 24px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .slider {
          background-color: var(--primary-color);
        }
        
        input:checked + .slider:before {
          transform: translateX(24px);
        }
        
        .poster-list {
          margin-top: 8px;
        }
        
        .poster-item {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .poster-item input {
          flex: 1;
        }
        
        .remove-btn {
          padding: 8px 16px;
          background: var(--error-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .add-btn {
          padding: 8px 16px;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 8px;
        }
        
        .section-title {
          font-weight: 600;
          margin-top: 24px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--divider-color);
        }
        
        .help-text {
          font-size: 0.85em;
          color: var(--secondary-text-color);
          margin-top: 4px;
        }
      </style>
      
      <div class="card-config">
        <div class="section-title">Required Settings</div>
        
        <div class="config-row">
          <div class="config-label">Media Player Entity</div>
          <div class="config-input">
            <input
              type="text"
              id="media_player"
              value="${this._config.media_player || ''}"
              placeholder="media_player.apple_tv"
            />
          </div>
        </div>
        
        <div class="section-title">Poster Configuration</div>
        
        <div class="config-row">
          <div class="config-label">Auto-Load from Folder</div>
          <div class="config-input">
            <label class="switch">
              <input type="checkbox" id="auto_load_folder" ${this._config.auto_load_folder !== false ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <div class="help-text">Automatically load posters from folder path</div>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Poster Folder</div>
          <div class="config-input">
            <input
              type="text"
              id="poster_folder"
              value="${this._config.poster_folder || '/local/posters'}"
              placeholder="/local/posters"
            />
            <div class="help-text">Path to folder containing poster images</div>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Poster Order</div>
          <div class="config-input">
            <select id="poster_order">
              <option value="random" ${this._config.poster_order === 'random' ? 'selected' : ''}>Random</option>
              <option value="sequential" ${this._config.poster_order === 'sequential' ? 'selected' : ''}>Sequential</option>
            </select>
            <div class="help-text">How to cycle through posters</div>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Manual Poster List (Optional)</div>
          <div class="config-input">
            <div class="poster-list" id="poster-list"></div>
            <button class="add-btn" id="add-poster">Add Poster</button>
            <div class="help-text">Only needed if not using auto-load</div>
          </div>
        </div>
        
        <div class="section-title">Layout & Display</div>
        
        <div class="config-row">
          <div class="config-label">Layout</div>
          <div class="config-input">
            <select id="layout">
              <option value="landscape" ${this._config.layout === 'landscape' ? 'selected' : ''}>Landscape</option>
              <option value="portrait" ${this._config.layout === 'portrait' ? 'selected' : ''}>Portrait</option>
            </select>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Fullscreen Mode</div>
          <div class="config-input">
            <label class="switch">
              <input type="checkbox" id="fullscreen" ${this._config.fullscreen ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <div class="help-text">Display card in fullscreen</div>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Hide Toolbar</div>
          <div class="config-input">
            <label class="switch">
              <input type="checkbox" id="hide_toolbar" ${this._config.hide_toolbar ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <div class="help-text">Remove padding for edge-to-edge display</div>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Card Title</div>
          <div class="config-input">
            <input
              type="text"
              id="title"
              value="${this._config.title || 'Movie Collection'}"
              placeholder="Movie Collection"
            />
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Poster Fit</div>
          <div class="config-input">
            <select id="poster_fit">
              <option value="cover" ${this._config.poster_fit === 'cover' ? 'selected' : ''}>Cover</option>
              <option value="contain" ${this._config.poster_fit === 'contain' ? 'selected' : ''}>Contain</option>
            </select>
          </div>
        </div>
        
        <div class="section-title">Timing & Animation</div>
        
        <div class="config-row">
          <div class="config-label">Slide Interval (seconds)</div>
          <div class="config-input">
            <input
              type="number"
              id="slide_interval"
              value="${this._config.slide_interval || 30}"
              min="5"
              max="300"
            />
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Transition Duration (ms)</div>
          <div class="config-input">
            <input
              type="number"
              id="transition_duration"
              value="${this._config.transition_duration || 1000}"
              min="300"
              max="3000"
            />
          </div>
        </div>
        
        <div class="section-title">Widget Settings</div>
        
        <div class="config-row">
          <div class="config-label">Widget Style</div>
          <div class="config-input">
            <select id="widget_style">
              <option value="glass" ${this._config.widget_style === 'glass' ? 'selected' : ''}>Glass</option>
              <option value="solid" ${this._config.widget_style === 'solid' ? 'selected' : ''}>Solid</option>
              <option value="minimal" ${this._config.widget_style === 'minimal' ? 'selected' : ''}>Minimal</option>
            </select>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Show Time</div>
          <div class="config-input">
            <label class="switch">
              <input type="checkbox" id="show_time" ${this._config.show_time !== false ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Time Position</div>
          <div class="config-input">
            <select id="time_position">
              <option value="top-left" ${this._config.time_position === 'top-left' ? 'selected' : ''}>Top Left</option>
              <option value="top-right" ${this._config.time_position === 'top-right' ? 'selected' : ''}>Top Right</option>
              <option value="top-center" ${this._config.time_position === 'top-center' ? 'selected' : ''}>Top Center</option>
              <option value="bottom-left" ${this._config.time_position === 'bottom-left' ? 'selected' : ''}>Bottom Left</option>
              <option value="bottom-right" ${this._config.time_position === 'bottom-right' ? 'selected' : ''}>Bottom Right</option>
              <option value="bottom-center" ${this._config.time_position === 'bottom-center' ? 'selected' : ''}>Bottom Center</option>
            </select>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Show Weather</div>
          <div class="config-input">
            <label class="switch">
              <input type="checkbox" id="show_weather" ${this._config.show_weather ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Weather Entity</div>
          <div class="config-input">
            <input
              type="text"
              id="weather_entity"
              value="${this._config.weather_entity || ''}"
              placeholder="weather.home"
              ${!this._config.show_weather ? 'disabled' : ''}
            />
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Weather Position</div>
          <div class="config-input">
            <select id="weather_position" ${!this._config.show_weather ? 'disabled' : ''}>
              <option value="top-left" ${this._config.weather_position === 'top-left' ? 'selected' : ''}>Top Left</option>
              <option value="top-right" ${this._config.weather_position === 'top-right' ? 'selected' : ''}>Top Right</option>
              <option value="top-center" ${this._config.weather_position === 'top-center' ? 'selected' : ''}>Top Center</option>
              <option value="bottom-left" ${this._config.weather_position === 'bottom-left' ? 'selected' : ''}>Bottom Left</option>
              <option value="bottom-right" ${this._config.weather_position === 'bottom-right' ? 'selected' : ''}>Bottom Right</option>
              <option value="bottom-center" ${this._config.weather_position === 'bottom-center' ? 'selected' : ''}>Bottom Center</option>
            </select>
          </div>
        </div>
        
        <div class="config-row">
          <div class="config-label">Show "Now Playing" Text</div>
          <div class="config-input">
            <label class="switch">
              <input type="checkbox" id="show_now_playing_text" ${this._config.show_now_playing_text !== false ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    `;

    this.renderPosterList();
    this.attachEventListeners();
  }

  renderPosterList() {
    const posterList = this.querySelector('#poster-list');
    if (!posterList) return;

    const posters = this._config.posters || [];
    
    posterList.innerHTML = posters.map((poster, index) => `
      <div class="poster-item">
        <input
          type="text"
          class="poster-input"
          data-index="${index}"
          value="${poster}"
          placeholder="/local/posters/movie.jpg"
        />
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `).join('');
  }

  attachEventListeners() {
    // Simple inputs
    ['media_player', 'poster_folder', 'title', 'weather_entity'].forEach(field => {
      const input = this.querySelector(`#${field}`);
      if (input) {
        input.addEventListener('input', (e) => {
          this._config[field] = e.target.value;
          this.configChanged(this._config);
        });
      }
    });

    // Number inputs
    ['slide_interval', 'transition_duration'].forEach(field => {
      const input = this.querySelector(`#${field}`);
      if (input) {
        input.addEventListener('input', (e) => {
          this._config[field] = parseInt(e.target.value);
          this.configChanged(this._config);
        });
      }
    });

    // Select inputs
    ['poster_fit', 'layout', 'poster_order', 'widget_style', 'time_position', 'weather_position'].forEach(field => {
      const input = this.querySelector(`#${field}`);
      if (input) {
        input.addEventListener('change', (e) => {
          this._config[field] = e.target.value;
          this.configChanged(this._config);
        });
      }
    });

    // Checkboxes
    ['show_time', 'show_weather', 'show_now_playing_text', 'fullscreen', 'hide_toolbar', 'auto_load_folder'].forEach(field => {
      const input = this.querySelector(`#${field}`);
      if (input) {
        input.addEventListener('change', (e) => {
          this._config[field] = e.target.checked;
          
          // Enable/disable weather entity input
          if (field === 'show_weather') {
            const weatherEntity = this.querySelector('#weather_entity');
            const weatherPosition = this.querySelector('#weather_position');
            if (weatherEntity) weatherEntity.disabled = !e.target.checked;
            if (weatherPosition) weatherPosition.disabled = !e.target.checked;
          }
          
          this.configChanged(this._config);
        });
      }
    });

    // Poster inputs
    this.querySelectorAll('.poster-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const index = parseInt(e.target.dataset.index);
        if (!this._config.posters) this._config.posters = [];
        this._config.posters[index] = e.target.value;
        this.configChanged(this._config);
      });
    });

    // Remove poster buttons
    this.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        if (!this._config.posters) this._config.posters = [];
        this._config.posters.splice(index, 1);
        this.configChanged(this._config);
        this.renderPosterList();
        this.attachEventListeners();
      });
    });

    // Add poster button
    const addBtn = this.querySelector('#add-poster');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (!this._config.posters) this._config.posters = [];
        this._config.posters.push('');
        this.configChanged(this._config);
        this.renderPosterList();
        this.attachEventListeners();
      });
    }
  }
}

customElements.define('movie-poster-card-editor', MoviePosterCardEditor);
