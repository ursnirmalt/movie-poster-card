# Quick Start Guide

Get your Movie Poster Card up and running in 5 minutes with the new auto-load feature!

## 🚀 Installation

### Option 1: HACS (Recommended)
1. Open HACS → Frontend
2. Click ⋮ → Custom repositories
3. Add: `https://github.com/yourusername/movie-poster-card`
4. Install "Movie Poster Card"
5. Restart Home Assistant

### Option 2: Manual
1. Download `movie-poster-card.js`
2. Copy to `/config/www/`
3. Add resource in Settings → Dashboards → Resources:
   - URL: `/local/movie-poster-card.js`
   - Type: JavaScript Module
4. Restart Home Assistant

## 📁 Prepare Your Posters

### NEW: Auto-Load from Folder (Easiest!)

1. Create folder: `/config/www/posters/`
2. Add your movie poster images (JPG, PNG, WebP)
3. That's it! The card will auto-load them all

Example structure:
```
config/www/posters/
  ├── inception.jpg
  ├── interstellar.jpg
  ├── tenet.jpg
  └── dunkirk.jpg
```

### Optional: Organize by Genre
```
config/www/posters/
  ├── action/
  │   ├── mad_max.jpg
  │   └── john_wick.jpg
  ├── scifi/
  │   ├── blade_runner.jpg
  │   └── arrival.jpg
  └── kids/
      ├── toy_story.jpg
      └── frozen.jpg
```

## 🎬 Add the Card

### Simplest Configuration (Auto-load)
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
poster_order: random
```

### With Time & Weather
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
poster_order: random
show_time: true
show_weather: true
weather_entity: weather.home
```

### Fullscreen Wall Panel
```yaml
type: custom:movie-poster-card
media_player: media_player.wall_tablet
poster_folder: /local/posters
auto_load_folder: true
fullscreen: true
hide_toolbar: true
show_time: true
show_weather: true
weather_entity: weather.home
time_position: top-left
weather_position: top-right
```

## ✅ Test It

1. Card should show posters rotating automatically
2. Play something on your media player
3. Watch it transition to media artwork with progress bar!

## 🎨 Customize

### Change Poster Order
```yaml
poster_order: sequential  # Or 'random' (default)
```

### Adjust Timing
```yaml
slide_interval: 30        # Seconds between posters
transition_duration: 1000 # Animation speed (ms)
```

### Change Layout
```yaml
layout: portrait  # Or 'landscape' (default)
```

### Position Widgets
```yaml
time_position: top-left      # Or: top-right, bottom-left, etc.
weather_position: top-right
```

### Style Widgets
```yaml
widget_style: glass  # Or: solid, minimal
```

## 📚 Configuration Options Reference

### Quick Reference
```yaml
type: custom:movie-poster-card

# Required
media_player: media_player.apple_tv

# Posters (NEW!)
poster_folder: /local/posters
auto_load_folder: true
poster_order: random  # or 'sequential'

# Display (NEW!)
layout: landscape  # or 'portrait'
fullscreen: false
hide_toolbar: false

# Widgets (NEW!)
show_time: true
show_weather: true
weather_entity: weather.home
time_position: top-right
weather_position: top-right
widget_style: glass  # or 'solid', 'minimal'

# Timing
slide_interval: 30
transition_duration: 1000

# Optional
title: "Movie Collection"
poster_fit: cover  # or 'contain'
```

## 🆘 Troubleshooting

### Posters not auto-loading?
- ✅ Check `auto_load_folder: true` is set
- ✅ Verify folder path: `/local/posters` = `/config/www/posters/`
- ✅ Ensure images are JPG, PNG, or WebP
- ✅ Refresh browser (Ctrl+F5)

### Card not appearing?
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check browser console for errors

### Media not working?
- Verify media player entity ID in Developer Tools → States
- Check media player provides required attributes

### Widgets not showing?
- Ensure `show_time: true` or `show_weather: true`
- Check weather entity exists (for weather widget)
- Verify position values are valid

## 📖 Learn More

- [Full Documentation](README.md)
- [Styling Guide](STYLING.md) - Widget customization
- [Installation Guide](INSTALLATION.md) - Detailed setup
- [Advanced Features](ADVANCED.md) - Power user tips
- [Examples](examples.yaml) - Copy-paste configs

## 🎯 Next Steps

### 1. Organize Posters by Genre
Create separate folders and cards:
```yaml
# Action Movies
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters/action
auto_load_folder: true
title: "Action Collection"
```

### 2. Customize Widget Styles
```yaml
time_style:
  font-size: 1.5rem
  color: '#FFD700'
  background: 'rgba(0, 0, 0, 0.8)'
```

### 3. Set Up Multiple Rooms
Create cards for each room with different poster collections

### 4. Try Different Layouts
Experiment with portrait mode for tablets, fullscreen for wall panels

---

Enjoy your cinematic dashboard! 🍿

Need help? Check the [full documentation](README.md) or open an issue on GitHub.
