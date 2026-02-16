# Changelog

All notable changes to Movie Poster Card will be documented in this file.

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

### Known Issues
- None reported

### Upcoming Features
- [ ] Multiple poster sources (Plex API, Jellyfin API)
- [ ] Auto-discovery of posters from media library
- [ ] Custom color themes
- [ ] Grid view mode for poster gallery
- [ ] Touch controls for manual poster navigation
- [ ] Metadata display (year, rating, genre)
- [ ] Integration with recommendation engines

---

## Version History

### Version 1.0.0 (Current)
- Initial public release
- Full feature set for poster display and media integration
- HACS compatible
- Visual configuration editor

---

## Upgrade Guide

### From Manual Installation to HACS

If you previously installed manually and want to switch to HACS:

1. Remove manual resource entry:
   - Go to Settings → Dashboards → Resources
   - Remove `/local/movie-poster-card.js`

2. Install via HACS (see Installation Guide)

3. Your existing card configurations will continue to work

### Breaking Changes

None (initial release)

---

## Support

For issues, questions, or feature requests:
- GitHub Issues: [yourusername/movie-poster-card/issues](https://github.com/yourusername/movie-poster-card/issues)
- Home Assistant Community: [Community Thread](https://community.home-assistant.io/)

---

## Credits

Created with ❤️ for the Home Assistant community

Inspired by:
- Wall Panel cards
- Cinematic UI design principles
- Home theater enthusiasts

## License

MIT License - See LICENSE file for details
