# ✅ WORKING CONFIGURATION - Use This!

## For Your /config/media/posters Folder

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
image_url: /media/posters
poster_order: random
slide_interval: 30
show_time: true
```

That's it! The card will automatically load all images from `/config/media/posters/`.

## Key Points

1. **Use `image_url` not `poster_path`** (like wall-panel does)
2. **Use `/media/posters`** for files in `/config/media/posters/`
3. **Use `/local/posters`** for files in `/config/www/posters/`
4. Card will auto-discover all images in the folder

## Alternative: Manual List

If auto-loading doesn't work, list them manually:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
image_url:
  - /media/posters/movie1.jpg
  - /media/posters/movie2.jpg
  - /media/posters/movie3.jpg
```

## Full Configuration Example

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
image_url: /media/posters
poster_order: random
slide_interval: 30
show_time: true
show_weather: true
weather_entity: weather.home
time_position: top-left
weather_position: top-right
widget_style: glass
layout: landscape
fullscreen: false
title: "Movie Collection"
```

## Check Browser Console

Press **F12** and look for:
- `Loading posters from:` - Shows what path it's trying
- `Loaded X posters` - Confirms images were found

If you see errors, they'll help diagnose the issue.
