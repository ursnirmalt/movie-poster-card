# Advanced Features & Tips

This guide covers advanced usage scenarios and optimization tips for the Movie Poster Card.

## Table of Contents
- [Advanced Configurations](#advanced-configurations)
- [Automation Integration](#automation-integration)
- [Performance Optimization](#performance-optimization)
- [Styling Customization](#styling-customization)
- [Multi-User Scenarios](#multi-user-scenarios)
- [Integration with Other Systems](#integration-with-other-systems)

## Advanced Configurations

### Dynamic Poster Rotation Based on Time of Day

Use Home Assistant automations to change posters based on time:

```yaml
# automation.yaml
- alias: "Movie Posters - Morning (Family Friendly)"
  trigger:
    - platform: time
      at: "06:00:00"
  action:
    - service: browser_mod.lovelace_reload
      # Your card will reload with morning posters

- alias: "Movie Posters - Evening (All Content)"
  trigger:
    - platform: time
      at: "20:00:00"
  action:
    - service: browser_mod.lovelace_reload
```

### Conditional Display Based on Media Player State

Show different cards based on what's playing:

```yaml
type: conditional
conditions:
  - entity: media_player.apple_tv
    state: playing
card:
  type: custom:movie-poster-card
  media_player: media_player.apple_tv
  posters:
    - /local/posters/movie1.jpg
```

### Multiple Poster Sets

Organize posters by mood or genre:

```yaml
# Action Night
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/action/mad_max.jpg
  - /local/posters/action/john_wick.jpg
  - /local/posters/action/mission_impossible.jpg
title: "Action Night"

# Sci-Fi Sunday
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/scifi/blade_runner.jpg
  - /local/posters/scifi/interstellar.jpg
  - /local/posters/scifi/arrival.jpg
title: "Sci-Fi Sunday"
```

## Automation Integration

### Auto-Pause Slideshow When Media Starts

The card automatically handles this, but you can create custom automations:

```yaml
# automation.yaml
- alias: "Dim Lights When Movie Starts"
  trigger:
    - platform: state
      entity_id: media_player.apple_tv
      to: playing
  action:
    - service: light.turn_on
      target:
        entity_id: light.living_room
      data:
        brightness: 20

- alias: "Restore Lights When Movie Ends"
  trigger:
    - platform: state
      entity_id: media_player.apple_tv
      from: playing
      to: idle
  action:
    - service: light.turn_on
      target:
        entity_id: light.living_room
      data:
        brightness: 100
```

### Notification When Favorite Movie Plays

```yaml
# automation.yaml
- alias: "Notify - Favorite Movie Playing"
  trigger:
    - platform: state
      entity_id: media_player.apple_tv
      attribute: media_title
  condition:
    - condition: template
      value_template: >
        {{ 'Inception' in state_attr('media_player.apple_tv', 'media_title') }}
  action:
    - service: notify.mobile_app
      data:
        message: "Your favorite movie is playing!"
```

### Seasonal Poster Rotation

```yaml
# automation.yaml
- alias: "Halloween Posters"
  trigger:
    - platform: time
      at: "00:00:00"
  condition:
    - condition: template
      value_template: "{{ now().month == 10 }}"
  action:
    - service: lovelace.reload_resources

# Switch to horror/thriller posters in October
```

## Performance Optimization

### Image Optimization

Optimize poster images for better performance:

```bash
# Using ImageMagick
convert poster.jpg -resize 1500x2250 -quality 85 poster_optimized.jpg

# Batch optimization
for file in *.jpg; do
  convert "$file" -resize 1500x2250 -quality 85 "optimized_$file"
done

# Using WebP for better compression
convert poster.jpg -resize 1500x2250 -quality 85 poster.webp
```

### Recommended Image Specifications
- **Resolution**: 1000-1500px width
- **Aspect Ratio**: 2:3 (poster standard)
- **Format**: JPG or WebP
- **Quality**: 80-85%
- **File Size**: Under 500KB per image

### Caching Strategies

Configure browser caching for posters:

```yaml
# configuration.yaml (if using custom server)
http:
  use_x_forwarded_for: true
  trusted_proxies:
    - 127.0.0.1
  cors_allowed_origins:
    - https://your-domain.com
```

### Preloading Critical Images

For wall panels or always-on displays:

```yaml
# Reduce slide_interval to load images more frequently
slide_interval: 60
transition_duration: 2000  # Slower, smoother transitions
```

## Styling Customization

### Custom CSS (via card-mod)

Install card-mod and customize appearance:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/movie1.jpg
card_mod:
  style: |
    ha-card {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    }
```

### Theme Integration

Match your Home Assistant theme:

```yaml
# themes.yaml
movie_night:
  primary-color: "#e50914"
  accent-color: "#b81d24"
  primary-background-color: "#141414"
  card-background-color: "#1f1f1f"
```

## Multi-User Scenarios

### Personal Poster Collections

Each user can have their own poster set:

```yaml
# User 1 - Dad's Collection
type: custom:movie-poster-card
media_player: media_player.living_room_tv
posters:
  - /local/posters/dad/action1.jpg
  - /local/posters/dad/action2.jpg
title: "Dad's Favorites"

# User 2 - Mom's Collection
type: custom:movie-poster-card
media_player: media_player.bedroom_tv
posters:
  - /local/posters/mom/drama1.jpg
  - /local/posters/mom/romance1.jpg
title: "Mom's Favorites"

# User 3 - Kids Collection
type: custom:movie-poster-card
media_player: media_player.kids_room_tv
posters:
  - /local/posters/kids/animation1.jpg
  - /local/posters/kids/disney1.jpg
title: "Kids Movies"
```

### Presence-Based Display

Show different posters based on who's home:

```yaml
type: conditional
conditions:
  - entity: person.dad
    state: home
card:
  type: custom:movie-poster-card
  media_player: media_player.apple_tv
  posters:
    - /local/posters/action/movie1.jpg
```

## Integration with Other Systems

### Plex Integration

Auto-populate from Plex library:

```yaml
# Use Plex sensor to get recent additions
sensor:
  - platform: plex_recently_added
    name: Recently Added Movies
    token: YOUR_PLEX_TOKEN
    host: YOUR_PLEX_HOST
    
# Reference in card
type: custom:movie-poster-card
media_player: media_player.plex
posters:
  # Manually add Plex poster URLs
  - http://plex-server/library/metadata/123/thumb
```

### Jellyfin Integration

```yaml
# Similar to Plex, use Jellyfin API
type: custom:movie-poster-card
media_player: media_player.jellyfin
posters:
  - http://jellyfin-server/Items/abc123/Images/Primary
```

### Kodi Integration

```yaml
type: custom:movie-poster-card
media_player: media_player.kodi
posters:
  # Use Kodi's artwork URLs
  - http://kodi-server/image/image%3A%2F%2Fvideo%40movie.jpg
```

### TMDB (The Movie Database) Integration

Use TMDB to get poster URLs:

```yaml
# Requires TMDB integration
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - https://image.tmdb.org/t/p/w500/poster1.jpg
  - https://image.tmdb.org/t/p/w500/poster2.jpg
```

## Advanced Display Scenarios

### Multi-Screen Setup

For homes with multiple displays:

```yaml
# Living Room - Family Content
type: custom:movie-poster-card
media_player: media_player.living_room_tv
posters:
  - /local/posters/family/movie1.jpg
slide_interval: 30
show_time: true
show_weather: true
weather_entity: weather.home

# Theater Room - Cinema Experience
type: custom:movie-poster-card
media_player: media_player.theater_tv
posters:
  - /local/posters/theater/movie1.jpg
slide_interval: 45
show_time: false
show_weather: false
transition_duration: 2000

# Bedroom - Relaxing Content
type: custom:movie-poster-card
media_player: media_player.bedroom_tv
posters:
  - /local/posters/relaxing/movie1.jpg
slide_interval: 60
show_time: true
```

### Kiosk Mode for Wall Tablets

```yaml
# Full-screen immersive experience
type: custom:movie-poster-card
media_player: media_player.wall_tablet
posters:
  - /local/posters/showcase/movie1.jpg
slide_interval: 20
show_time: true
show_weather: true
weather_entity: weather.home
show_now_playing_text: true
transition_duration: 1500
```

### Picture Frame Mode

Slow, elegant transitions:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/classics/movie1.jpg
  - /local/posters/classics/movie2.jpg
slide_interval: 120  # 2 minutes
transition_duration: 3000  # 3 seconds
show_time: false
show_weather: false
title: "Classic Cinema"
```

## Tips & Tricks

### Poster Curation
- Use high-quality posters from TMDB or The Poster Database
- Maintain consistent aspect ratios (2:3 recommended)
- Organize by genre, decade, or mood
- Update seasonally for fresh content

### Performance Tips
- Keep poster count reasonable (10-30 is ideal)
- Use local files when possible
- Optimize image sizes
- Consider SSD storage for faster loading

### User Experience
- Match slide intervals to viewing patterns
- Enable weather/time for utility
- Customize titles for context
- Test on actual display devices

### Maintenance
- Regularly update poster collections
- Remove duplicate or low-quality images
- Monitor file sizes for storage management
- Keep paths organized and documented

## Troubleshooting Advanced Scenarios

### Multiple Media Players

If you have multiple media players and want one card:

**Problem**: Card only monitors one media player

**Solution**: Use a template sensor to combine states

```yaml
# configuration.yaml
template:
  - sensor:
      - name: "Active Media Player"
        state: >
          {% set players = [
            'media_player.apple_tv',
            'media_player.plex',
            'media_player.bedroom_tv'
          ] %}
          {% for player in players %}
            {% if states(player) == 'playing' %}
              {{ player }}
            {% endif %}
          {% endfor %}
```

### Dynamic Poster Loading

**Problem**: Want to load posters dynamically from a directory

**Solution**: Use file system integration (requires configuration)

Currently, posters must be manually listed. Future versions may support auto-discovery.

## Community Contributions

Have an advanced configuration or tip? Share it:

1. Fork the repository
2. Add your example to this guide
3. Submit a pull request

## Further Reading

- [Home Assistant Automations](https://www.home-assistant.io/docs/automation/)
- [Lovelace UI](https://www.home-assistant.io/lovelace/)
- [HACS Documentation](https://hacs.xyz/)
- [Card-mod Documentation](https://github.com/thomasloven/lovelace-card-mod)

---

Happy customizing! 🎬
