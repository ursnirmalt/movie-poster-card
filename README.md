# Movie Poster Card for Home Assistant

A custom HACS card that displays movie posters with seamless Apple TV (or any media player) integration. When your media player starts playing, the poster automatically transitions to show the media artwork in fullscreen with a beautiful progress bar, runtime, and playback information.

![Movie Poster Card Demo](https://via.placeholder.com/800x450.png?text=Movie+Poster+Card+Demo)

## Features

✨ **Dynamic Poster Slideshow** - Automatically cycles through your movie poster collection  
🎬 **Media Player Integration** - Seamlessly transitions to media artwork when playing  
📊 **Progress Bar** - Beautiful animated progress bar showing current playback position  
⏱️ **Runtime Display** - Shows total runtime and elapsed time  
🌤️ **Weather Integration** (Optional) - Display current weather conditions  
🕐 **Time Display** (Optional) - Show current time  
🎨 **Sleek Design** - Cinematic UI with smooth transitions and glassmorphism effects  
📱 **Responsive** - Works on all screen sizes  

## Installation

### HACS Installation (Recommended)

1. Open HACS in Home Assistant
2. Go to "Frontend"
3. Click the three dots menu (top right) and select "Custom repositories"
4. Add this repository URL: `https://github.com/ursnirmalt/movie-poster-card`
5. Category: `Lovelace`
6. Click "Add"
7. Find "Movie Poster Card" in the list and click "Install"
8. Restart Home Assistant

### Manual Installation

1. Download `movie-poster-card.js` from this repository
2. Copy it to your `config/www/` folder
3. Add the resource to your Lovelace dashboard:
   ```yaml
   resources:
     - url: /local/movie-poster-card.js
       type: module
   ```
4. Restart Home Assistant

## Configuration

### Basic Configuration

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_path: /local/posters
posters:
  - /local/posters/inception.jpg
  - /local/posters/interstellar.jpg
  - /local/posters/tenet.jpg
  - /local/posters/dunkirk.jpg
```

### Full Configuration

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_path: /local/posters
posters:
  - /local/posters/movie1.jpg
  - /local/posters/movie2.jpg
  - /local/posters/movie3.jpg
slide_interval: 30  # Seconds between poster changes
show_time: true
show_weather: true
weather_entity: weather.home
show_now_playing_text: true
idle_timeout: 300  # Seconds before returning to poster mode
transition_duration: 1000  # Milliseconds for transitions
poster_fit: cover  # or 'contain'
title: "My Movie Collection"
```

## Configuration Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `media_player` | string | **required** | Entity ID of your media player (e.g., `media_player.apple_tv`) |
| `poster_path` | string | `/local/posters` | Base path for poster images |
| `posters` | list | `[]` | Array of poster image paths |
| `slide_interval` | number | `30` | Seconds between poster slides |
| `show_time` | boolean | `true` | Display current time |
| `show_weather` | boolean | `false` | Display weather widget |
| `weather_entity` | string | `''` | Weather entity ID (required if show_weather is true) |
| `show_now_playing_text` | boolean | `true` | Show "NOW PLAYING" text when media is active |
| `idle_timeout` | number | `300` | Seconds of inactivity before returning to posters |
| `transition_duration` | number | `1000` | Transition animation duration in milliseconds |
| `poster_fit` | string | `cover` | How posters fit the screen (`cover` or `contain`) |
| `title` | string | `Movie Collection` | Title displayed when showing posters |

## Setting Up Your Posters

### Directory Structure

Create a folder in your Home Assistant configuration:

```
config/
  www/
    posters/
      inception.jpg
      interstellar.jpg
      tenet.jpg
      ...
```

### Adding Posters

1. Download movie poster images (recommended size: 1000x1500px or similar aspect ratio)
2. Save them to `config/www/posters/`
3. Reference them in your configuration:
   ```yaml
   posters:
     - /local/posters/inception.jpg
     - /local/posters/interstellar.jpg
   ```

### Poster Sources

You can use posters from:
- **Local files** in `/config/www/` (recommended)
- **Media folder** if you have it configured
- **External URLs** (not recommended for performance)

## Media Player Compatibility

This card works with any Home Assistant media player that provides:
- `state` (playing/paused/idle)
- `entity_picture` (media artwork)
- `media_title`
- `media_duration`
- `media_position`

### Tested Media Players

✅ Apple TV  
✅ Plex  
✅ Jellyfin  
✅ Kodi  
✅ Roku  
✅ Chromecast  
✅ Spotify  

## Advanced Examples

### Wall Panel Configuration

Perfect for a dedicated wall-mounted tablet:

```yaml
type: custom:movie-poster-card
media_player: media_player.living_room_tv
posters:
  - /local/posters/action/mad_max.jpg
  - /local/posters/action/john_wick.jpg
  - /local/posters/scifi/blade_runner.jpg
  - /local/posters/scifi/arrival.jpg
slide_interval: 20
show_time: true
show_weather: true
weather_entity: weather.home
title: "Home Cinema"
transition_duration: 800
```

### Multi-Room Setup

```yaml
# Living Room
type: custom:movie-poster-card
media_player: media_player.living_room_apple_tv
posters:
  - /local/posters/family/toy_story.jpg
  - /local/posters/family/frozen.jpg
title: "Family Room"

# Home Theater
type: custom:movie-poster-card
media_player: media_player.theater_apple_tv
posters:
  - /local/posters/premium/dune.jpg
  - /local/posters/premium/blade_runner_2049.jpg
show_weather: false
title: "Home Theater"
```

### Minimal Configuration

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/movie1.jpg
  - /local/posters/movie2.jpg
show_time: false
show_weather: false
show_now_playing_text: false
```

## Styling & Theming

The card uses a cinematic design with:
- Glassmorphism effects
- Smooth transitions
- Gradient overlays
- Text shadows for readability
- Responsive layout

The design automatically adapts to:
- Light and dark content
- Different screen sizes
- Portrait and landscape orientations

## Troubleshooting

### Posters Not Showing

1. Check file paths are correct (case-sensitive)
2. Ensure files exist in `/config/www/posters/`
3. Check browser console for errors
4. Verify paths use `/local/` prefix

### Media Player Not Updating

1. Confirm media player entity ID is correct
2. Check that media player provides required attributes
3. Verify media player is properly configured in Home Assistant

### Weather Widget Not Showing

1. Ensure `weather_entity` is configured
2. Verify weather integration is set up
3. Check entity ID is correct

### Performance Issues

1. Reduce `slide_interval` for fewer transitions
2. Optimize poster image sizes (max 2000px width recommended)
3. Use local files instead of external URLs
4. Increase `transition_duration` for smoother animations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use and modify as needed.

## Credits

Inspired by wall-panel cards and cinematic UI design principles.

---

**Note**: This is a custom card and requires manual installation or HACS. It is not officially affiliated with Home Assistant or Apple.
