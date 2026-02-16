# Quick Start Guide

Get your Movie Poster Card up and running in 5 minutes!

## 🚀 Quick Installation

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

1. Create folder: `/config/www/posters/`
2. Add your movie poster images (JPG or PNG)
3. Example structure:
   ```
   config/www/posters/
     ├── inception.jpg
     ├── interstellar.jpg
     └── tenet.jpg
   ```

## 🎬 Add the Card

### Visual Editor Method
1. Edit Dashboard → Add Card
2. Search "Movie Poster Card"
3. Configure:
   - Media Player: `media_player.apple_tv`
   - Add posters: `/local/posters/inception.jpg`
4. Save!

### YAML Method
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/inception.jpg
  - /local/posters/interstellar.jpg
  - /local/posters/tenet.jpg
show_time: true
show_weather: true
weather_entity: weather.home
```

## ✅ Test It

1. Card should show posters rotating
2. Play something on Apple TV
3. Watch it transition to media artwork!

## 🎨 Customize

```yaml
slide_interval: 30        # Seconds between posters
transition_duration: 1000 # Animation speed (ms)
title: "My Movies"        # Card title
show_time: true          # Show clock
show_weather: true       # Show weather
```

## 📚 Need More Help?

- [Full Documentation](README.md)
- [Installation Guide](INSTALLATION.md)
- [Advanced Features](ADVANCED.md)
- [Examples](examples.yaml)

## 🆘 Troubleshooting

**Posters not showing?**
- Check file paths (case-sensitive!)
- Verify files in `/config/www/posters/`
- Use `/local/` prefix in paths

**Media not working?**
- Verify media player entity ID
- Check in Developer Tools → States

**Card not appearing?**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check browser console for errors

---

That's it! Enjoy your cinematic dashboard! 🍿
