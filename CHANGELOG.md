# Changelog

All notable changes to Movie Poster Card will be documented in this file.

## [2.0.0] - 2024-02-17

### 🎉 Major Update - Auto-Load & Advanced Customization

This is a significant update with highly requested features and major improvements to usability and customization.

#### ✨ New Features

**Poster Management**
- ✅ **Auto-load posters from folder** - No more manual poster lists! Just point to a folder
- ✅ **Random or Sequential order** - Choose how posters cycle
- ✅ **Supports multiple image formats** - JPG, JPEG, PNG, WebP

**Layout & Display**
- ✅ **Portrait & Landscape layouts** - Optimized for any screen orientation
- ✅ **Fullscreen mode** - Take over entire viewport for dedicated displays
- ✅ **Hide toolbar option** - Edge-to-edge display with no padding
- ✅ **Improved responsive design** - Better mobile and tablet support

**Widget Customization**
- ✅ **Widget positioning** - 6 position options (corners + centers)
- ✅ **Widget styles** - Glass, solid, or minimal presets
- ✅ **Custom CSS styling** - Full control over widget appearance
- ✅ **Independent positioning** - Place time and weather separately

**UI/UX Improvements**
- ✅ **Enhanced visual editor** - New configuration options in UI
- ✅ **Better default values** - Works great out of the box
- ✅ **Improved animations** - Smoother transitions
- ✅ **Better error handling** - Clearer warnings and fallbacks

#### 🔧 Configuration Changes

**New Options:**
```yaml
# Poster loading
poster_folder: /local/posters
auto_load_folder: true
poster_order: random  # or 'sequential'

# Layout
layout: landscape  # or 'portrait'
fullscreen: false
hide_toolbar: false

# Widget positioning
time_position: top-right
weather_position: top-right
widget_style: glass  # or 'solid', 'minimal'

# Custom styles
time_style: {}
weather_style: {}
```

**Breaking Changes:**
- None! Fully backwards compatible with v1.0.0

#### 📚 Documentation

- ✅ New [STYLING.md](STYLING.md) guide for widget customization
- ✅ Updated [QUICKSTART.md](QUICKSTART.md) with auto-load instructions
- ✅ Enhanced [examples.yaml](examples.yaml) with new features
- ✅ Comprehensive widget positioning examples

#### 🐛 Bug Fixes

- **Fixed progress bar not updating** - Now updates in real-time every second while playing
- Fixed widget overlap issues
- Improved poster loading reliability
- Better handling of missing images
- Enhanced mobile responsiveness
- Progress bar now correctly calculates position based on media_position_updated_at

---

## [1.0.0] - 2024-02-16

### Initial Release

#### Features
- 🎬 Movie poster slideshow with automatic rotation
- 📺 Seamless media player integration (Apple TV, Plex, Jellyfin, etc.)
- 📊 Progress bar with elapsed time and total runtime
- 🎨 Cinematic UI with glassmorphism effects
- 🕐 Optional time display widget
- 🌤️ Optional weather widget integration
- ⚡ Smooth transitions and animations
- 📱 Fully responsive design
- 🎛️ Visual configuration editor
- 🔧 Extensive customization options

#### Supported Media Players
- Apple TV
- Plex
- Jellyfin
- Kodi
- Roku
- Chromecast
- Spotify
- Any Home Assistant media player with required attributes

#### Configuration Options
- Adjustable slide intervals
- Customizable transition durations
- Poster fit modes (cover/contain)
- Toggle time and weather displays
- Custom card titles
- Configurable idle timeout

---

## Version Comparison

### v2.0.0 vs v1.0.0

**What's New:**
- Auto-load posters from folder (huge time saver!)
- Portrait & landscape layout options
- Fullscreen mode for dedicated displays
- Widget positioning (6 options)
- Widget styling (3 presets + custom CSS)
- Hide toolbar for edge-to-edge display
- Random or sequential poster order
- Enhanced visual editor

**What's the Same:**
- All v1.0.0 features still work
- Fully backwards compatible
- Same media player support
- Same core functionality

**Migration from v1.0.0:**
- No changes required!
- Old configs work as-is
- New features are optional
- Recommended: Switch to auto-load for easier poster management

---

## Upcoming Features

### Planned for v2.1.0
- [ ] API integration for Plex/Jellyfin poster auto-discovery
- [ ] Multiple poster sources in one card
- [ ] Poster metadata display (year, rating, genre)
- [ ] Touch controls for manual navigation
- [ ] Poster grid view mode

### Planned for v2.2.0
- [ ] Custom color themes
- [ ] Integration with recommendation engines
- [ ] Advanced filtering options
- [ ] Poster collections/playlists
- [ ] Statistics and viewing history

### Community Requests
- [ ] Support for video backgrounds
- [ ] Trailer integration
- [ ] IMDB/TMDB metadata
- [ ] Voice control integration
- [ ] Multi-language support

---

## Upgrade Guide

### From v1.0.0 to v2.0.0

#### No Breaking Changes!

Your existing configuration will continue to work exactly as before. All new features are optional additions.

#### Recommended Updates

**Before (v1.0.0):**
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/movie1.jpg
  - /local/posters/movie2.jpg
  - /local/posters/movie3.jpg
  # ... manual list continues
```

**After (v2.0.0 - Recommended):**
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
poster_order: random
```

Much simpler! Just point to a folder and all posters load automatically.

#### Adopting New Features

Add these options to enhance your setup:

```yaml
# Layout options
layout: landscape  # or portrait
fullscreen: false  # true for wall panels
hide_toolbar: false  # true for edge-to-edge

# Widget customization
time_position: top-right
weather_position: top-right
widget_style: glass

# Optional: Custom styles
time_style:
  font-size: 1.5rem
  color: '#FFD700'
```

---

## Support & Feedback

### Report Issues
- GitHub Issues: [yourusername/movie-poster-card/issues](https://github.com/yourusername/movie-poster-card/issues)
- Include: HA version, browser, configuration, console errors

### Feature Requests
- Open an issue with the `enhancement` label
- Describe the use case and desired behavior

### Community
- Home Assistant Community: [Community Thread](https://community.home-assistant.io/)
- Share your setups and configurations!

---

## Credits

Created with ❤️ for the Home Assistant community

### Special Thanks
- Home Assistant team for the excellent platform
- HACS developers for easy custom component distribution
- Community members for feature suggestions and testing
- Wall panel card developers for inspiration

---

## License

MIT License - See [LICENSE](LICENSE) file for details

---

**Latest Release:** v2.0.0  
**Release Date:** February 17, 2024  
**Download:** [GitHub Releases](https://github.com/yourusername/movie-poster-card/releases)
