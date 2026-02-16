## Movie Poster Card

A beautiful, cinematic custom card for Home Assistant that displays your movie poster collection with seamless media player integration.

### Key Features

- 🎬 **Automatic Slideshow**: Cycles through your movie posters automatically
- 🍿 **Media Player Integration**: Seamlessly transitions to show media artwork when playing
- 📊 **Progress Tracking**: Beautiful progress bar with runtime and elapsed time
- 🌤️ **Weather & Time**: Optional widgets for current conditions
- 🎨 **Cinematic Design**: Glassmorphism effects and smooth transitions
- 📱 **Fully Responsive**: Works on all screen sizes

### Quick Start

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

### Perfect For

- Wall-mounted tablets
- Home theater displays
- Media room dashboards
- Living room entertainment centers

[Full Documentation](https://github.com/yourusername/movie-poster-card)
