# Movie Poster Card for Home Assistant

A custom HACS card that displays movie posters with seamless Apple TV (or any media player) integration. **NEW:** Auto-load posters from folders, portrait/landscape layouts, fullscreen mode, and advanced widget customization!

![Movie Poster Card Demo](https://via.placeholder.com/800x450.png?text=Movie+Poster+Card+Demo)

## ✨ Features

### Core Features
🎬 **Auto-Load Posters** - Automatically load all posters from a folder (no manual list needed!)  
📺 **Media Player Integration** - Seamlessly transitions to media artwork when playing  
🖼️ **Random or Sequential** - Choose how posters cycle through your collection  
📊 **Progress Bar** - Beautiful animated progress bar showing current playback position  
⏱️ **Runtime Display** - Shows total runtime and elapsed time  

### Display & Layout
📱 **Portrait & Landscape** - Optimized layouts for any screen orientation  
🖥️ **Fullscreen Mode** - Take over the entire viewport for dedicated displays  
🎨 **Hide Toolbar** - Edge-to-edge display for clean, immersive experience  
✨ **Sleek Design** - Cinematic UI with smooth transitions and glassmorphism effects  

### Widgets & Customization
🕐 **Time Widget** - Optional clock display with 6 position options  
🌤️ **Weather Widget** - Optional weather display with custom styling  
🎨 **Widget Styles** - Glass, solid, or minimal preset styles  
💅 **Custom CSS** - Full control over widget appearance and position  
🎯 **Flexible Positioning** - Place widgets anywhere: corners, centers, top, or bottom  

### Performance
⚡ **Responsive** - Works on all screen sizes  
🔄 **Smooth Transitions** - Configurable animation speeds  
🎛️ **Visual Configuration** - Easy-to-use UI editor  

## 🚀 Quick Start

### Installation via HACS

1. Open HACS → Frontend
2. Click ⋮ → Custom repositories
3. Add: `https://github.com/yourusername/movie-poster-card`
4. Install "Movie Poster Card"
5. Restart Home Assistant

### Basic Configuration

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
poster_order: random
```

That's it! The card will automatically load all images from `/config/www/posters/`

## 📋 Configuration Options

### Required
| Option | Type | Description |
|--------|------|-------------|
| `media_player` | string | Entity ID of your media player |

### Poster Loading (NEW!)
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `poster_folder` | string | `/local/posters` | Folder path containing poster images |
| `auto_load_folder` | boolean | `true` | Auto-load posters from folder |
| `poster_order` | string | `random` | Poster order: `random` or `sequential` |
| `posters` | list | `[]` | Manual list of poster paths (optional) |

### Layout & Display (NEW!)
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `layout` | string | `landscape` | Layout: `landscape` or `portrait` |
| `fullscreen` | boolean | `false` | Enable fullscreen mode |
| `hide_toolbar` | boolean | `false` | Hide padding for edge-to-edge display |
| `poster_fit` | string | `cover` | How posters fit: `cover` or `contain` |

### Widgets (NEW!)
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `widget_style` | string | `glass` | Widget style: `glass`, `solid`, or `minimal` |
| `time_position` | string | `top-right` | Time position: `top-left`, `top-right`, `top-center`, `bottom-left`, `bottom-right`, `bottom-center` |
| `weather_position` | string | `top-right` | Weather position (same options as time) |
| `time_style` | object | `{}` | Custom CSS for time widget |
| `weather_style` | object | `{}` | Custom CSS for weather widget |

### Display Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show_time` | boolean | `true` | Display time widget |
| `show_weather` | boolean | `false` | Display weather widget |
| `weather_entity` | string | `''` | Weather entity ID |
| `show_now_playing_text` | boolean | `true` | Show "NOW PLAYING" text |
| `title` | string | `Movie Collection` | Card title when showing posters |

### Timing
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `slide_interval` | number | `30` | Seconds between poster slides |
| `transition_duration` | number | `1000` | Transition animation duration (ms) |

## 📁 Setting Up Posters

### Option 1: Auto-Load from Folder (Recommended)

1. Create folder: `/config/www/posters/`
2. Add your poster images
3. Configure:
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
poster_order: random
```

**Supported formats:** JPG, JPEG, PNG, WebP

### Option 2: Manual List

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/inception.jpg
  - /local/posters/interstellar.jpg
  - /local/posters/tenet.jpg
```

### Organize by Genre

```
config/www/posters/
  ├── action/
  ├── scifi/
  ├── drama/
  └── kids/
```

Then create separate cards:
```yaml
# Action Movies
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters/action
auto_load_folder: true
title: "Action Collection"
```

## 🎨 Example Configurations

### Wall Panel (Fullscreen)
```yaml
type: custom:movie-poster-card
media_player: media_player.wall_tablet
poster_folder: /local/posters
auto_load_folder: true
fullscreen: true
hide_toolbar: true
layout: landscape
show_time: true
show_weather: true
weather_entity: weather.home
time_position: top-left
weather_position: top-right
```

### Portrait Tablet
```yaml
type: custom:movie-poster-card
media_player: media_player.ipad
poster_folder: /local/posters
auto_load_folder: true
layout: portrait
time_position: top-center
weather_position: bottom-center
```

### Custom Styled Widgets
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
show_time: true
show_weather: true
weather_entity: weather.home
time_style:
  font-size: 1.8rem
  font-weight: 700
  color: '#FFD700'
  background: 'rgba(0, 0, 0, 0.9)'
  border: 3px solid #FFD700
  border-radius: 30px
weather_style:
  font-size: 1.2rem
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  border-radius: 25px
```

### Minimal Design
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
widget_style: minimal
show_time: true
show_weather: false
time_position: bottom-right
```

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Installation Guide](INSTALLATION.md)** - Detailed setup instructions
- **[Styling Guide](STYLING.md)** - Widget customization and positioning
- **[Advanced Guide](ADVANCED.md)** - Advanced features and tips
- **[Example Configurations](examples.yaml)** - Ready-to-use configs

## 🎯 Use Cases

### Home Entertainment
- Living room entertainment centers
- Home theater displays
- Media room dashboards
- Multi-room setups

### Displays
- Wall-mounted tablets
- Digital picture frames
- Kiosk mode displays
- Dedicated movie displays

### Layouts
- Landscape monitors and TVs
- Portrait tablets
- Vertical displays
- Multi-screen setups

## 🔌 Media Player Compatibility

Works with any Home Assistant media player that provides:
- `state` (playing/paused/idle)
- `entity_picture` (media artwork)
- `media_title`
- `media_duration`
- `media_position`

### Tested & Supported

✅ Apple TV  
✅ Plex  
✅ Jellyfin  
✅ Kodi  
✅ Roku  
✅ Chromecast  
✅ Spotify  
✅ Any media player with required attributes

## 🎨 Widget Positioning

Place time and weather widgets anywhere:

**Corners:**
- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right`

**Centers:**
- `top-center`
- `bottom-center`

**Example:**
```yaml
time_position: top-left
weather_position: top-right
```

## 💅 Widget Styles

### Preset Styles

**Glass (Default)** - Modern glassmorphism
```yaml
widget_style: glass
```

**Solid** - High contrast dark background
```yaml
widget_style: solid
```

**Minimal** - Transparent, text only
```yaml
widget_style: minimal
```

### Custom Styles

Full CSS customization:
```yaml
time_style:
  font-size: 1.5rem
  font-weight: 700
  color: '#FFD700'
  background: 'rgba(0, 0, 0, 0.8)'
  border: 2px solid #FFD700
  border-radius: 25px
  padding: 1rem 2rem
```

See [STYLING.md](STYLING.md) for complete guide.

## 🆕 What's New in v2.0

- ✨ **Auto-load posters from folder** - No more manual poster lists!
- 📐 **Portrait & Landscape layouts** - Optimized for any screen
- 🖥️ **Fullscreen mode** - Take over the entire viewport
- 🎨 **Widget positioning** - 6 position options for time/weather
- 💅 **Widget styling** - 3 preset styles + custom CSS
- 🎯 **Hide toolbar** - Edge-to-edge display option
- 🔄 **Random or sequential** - Choose poster order
- 🎛️ **Enhanced editor** - New visual configuration options

## 🐛 Troubleshooting

### Posters Not Loading

**Auto-load not working?**
- Ensure `auto_load_folder` is `true`
- Check `poster_folder` path is correct
- Verify images exist in `/config/www/posters/`
- Supported formats: JPG, JPEG, PNG, WebP

**Manual list not working?**
- Check file paths (case-sensitive!)
- Use `/local/` prefix
- Verify files exist

### Media Player Not Updating

1. Verify entity ID is correct
2. Check media player provides required attributes
3. Test in Developer Tools → States

### Widgets Not Showing

1. Check `show_time` or `show_weather` is `true`
2. Verify weather entity (for weather widget)
3. Check position values are valid

See [INSTALLATION.md](INSTALLATION.md) for more troubleshooting.

## 🤝 Contributing

Contributions welcome! Please submit issues and pull requests on GitHub.

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

## 🙏 Credits

Created for the Home Assistant community

Inspired by:
- Wall panel cards
- Cinematic UI design
- Home theater enthusiasts

---

**Questions?** Check the [documentation](INSTALLATION.md) or open an issue!

**Love this card?** Give it a ⭐ on GitHub!
