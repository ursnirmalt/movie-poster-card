# Installation Guide - Movie Poster Card

This guide will walk you through installing and configuring the Movie Poster Card for Home Assistant.

## Prerequisites

- Home Assistant installed and running
- Access to your Home Assistant configuration files
- A media player entity (Apple TV, Plex, Jellyfin, etc.)
- Movie poster images

## Installation Methods

### Method 1: HACS Installation (Recommended)

HACS (Home Assistant Community Store) is the easiest way to install and maintain custom cards.

#### Step 1: Install HACS (if not already installed)

If you don't have HACS installed:
1. Visit [HACS Installation Guide](https://hacs.xyz/docs/setup/download)
2. Follow the installation instructions
3. Restart Home Assistant

#### Step 2: Add Movie Poster Card Repository

1. Open Home Assistant
2. Go to **HACS** → **Frontend**
3. Click the **three dots menu** (⋮) in the top right
4. Select **Custom repositories**
5. Add this URL: `https://github.com/yourusername/movie-poster-card`
6. Select category: **Lovelace**
7. Click **Add**

#### Step 3: Install the Card

1. Search for "Movie Poster Card" in HACS
2. Click on it
3. Click **Download**
4. Click **Download** again to confirm
5. Restart Home Assistant (or clear browser cache)

### Method 2: Manual Installation

If you prefer manual installation:

#### Step 1: Download Files

1. Download `movie-poster-card.js` from the [releases page](https://github.com/yourusername/movie-poster-card/releases)
2. Optionally download `movie-poster-card-editor.js` for UI configuration

#### Step 2: Copy to Home Assistant

1. Copy `movie-poster-card.js` to `/config/www/`
2. If you downloaded the editor, copy `movie-poster-card-editor.js` to `/config/www/`

Your folder structure should look like:
```
config/
  www/
    movie-poster-card.js
    movie-poster-card-editor.js (optional)
```

#### Step 3: Add Resource to Lovelace

1. Go to **Settings** → **Dashboards**
2. Click the **three dots menu** (⋮) in the top right
3. Select **Resources**
4. Click **Add Resource**
5. Enter:
   - URL: `/local/movie-poster-card.js`
   - Resource type: **JavaScript Module**
6. Click **Create**

If you installed the editor:
7. Click **Add Resource** again
8. Enter:
   - URL: `/local/movie-poster-card-editor.js`
   - Resource type: **JavaScript Module**
9. Click **Create**

#### Step 4: Restart Home Assistant

1. Go to **Settings** → **System**
2. Click **Restart**
3. Confirm the restart

## Setting Up Your Posters

### Step 1: Create Poster Directory

1. Create a folder: `/config/www/posters/`
2. Organize by genre (optional):
   ```
   config/
     www/
       posters/
         action/
         scifi/
         drama/
         kids/
   ```

### Step 2: Add Poster Images

1. Download movie posters (recommended: 1000x1500px or 2:3 aspect ratio)
2. Save them to `/config/www/posters/`
3. Name them clearly (e.g., `inception.jpg`, `interstellar.jpg`)

**Poster Sources:**
- [The Movie Database (TMDB)](https://www.themoviedb.org/)
- [The Poster Database](https://theposterdb.com/)
- Your own collection

### Step 3: Verify File Access

1. In Home Assistant, go to **Media** → **Local Media**
2. Navigate to `/www/posters/`
3. Verify you can see your images

## Adding the Card to Your Dashboard

### Method 1: Visual Editor (Easiest)

1. Go to your dashboard
2. Click **Edit Dashboard** (pencil icon)
3. Click **Add Card**
4. Search for "Movie Poster Card"
5. Click to add it
6. Configure using the visual editor:
   - **Media Player Entity**: Select your media player
   - **Poster Path**: `/local/posters`
   - **Poster Images**: Click "Add Poster" and enter paths
   - Configure other options as desired
7. Click **Save**

### Method 2: YAML Configuration

1. Go to your dashboard
2. Click **Edit Dashboard** (pencil icon)
3. Click **Add Card**
4. Search for "Manual" or scroll to bottom
5. Select **Manual card**
6. Paste this configuration:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/inception.jpg
  - /local/posters/interstellar.jpg
  - /local/posters/tenet.jpg
slide_interval: 30
show_time: true
show_weather: true
weather_entity: weather.home
title: "Movie Collection"
```

7. Modify the configuration for your setup
8. Click **Save**

## Configuration Examples

### Basic Configuration
```yaml
type: custom:movie-poster-card
media_player: media_player.living_room_apple_tv
posters:
  - /local/posters/movie1.jpg
  - /local/posters/movie2.jpg
```

### Wall Panel Setup
```yaml
type: custom:movie-poster-card
media_player: media_player.wall_panel_tv
posters:
  - /local/posters/action/mad_max.jpg
  - /local/posters/action/john_wick.jpg
  - /local/posters/scifi/blade_runner.jpg
slide_interval: 25
show_time: true
show_weather: true
weather_entity: weather.home
title: "Home Cinema"
```

### Home Theater
```yaml
type: custom:movie-poster-card
media_player: media_player.theater_apple_tv
posters:
  - /local/posters/premium/dune.jpg
  - /local/posters/premium/oppenheimer.jpg
slide_interval: 20
show_time: false
show_weather: false
title: "Home Theater"
transition_duration: 1200
```

## Verifying Installation

### Check 1: Resource Loaded
1. Open your dashboard
2. Press **F12** to open browser console
3. Look for errors
4. If you see "movie-poster-card" errors, the resource isn't loaded

### Check 2: Card Appears
1. Add the card to your dashboard
2. If you see a blank card, check the browser console
3. Common issues:
   - Incorrect poster paths
   - Media player entity doesn't exist
   - Resource not loaded

### Check 3: Media Player Integration
1. Start playing something on your media player
2. The card should transition to show media artwork
3. If it doesn't:
   - Verify media player entity ID is correct
   - Check that media player provides `entity_picture`
   - Look in browser console for errors

## Troubleshooting

### Posters Not Showing

**Problem**: Card shows but posters are blank

**Solutions**:
1. Check file paths are correct (case-sensitive)
   ```yaml
   # ✅ Correct
   - /local/posters/inception.jpg
   
   # ❌ Wrong
   - /posters/inception.jpg
   - local/posters/inception.jpg
   ```

2. Verify files exist in `/config/www/posters/`

3. Check file permissions (SSH/Terminal):
   ```bash
   ls -la /config/www/posters/
   chmod 644 /config/www/posters/*.jpg
   ```

4. Clear browser cache:
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Cmd+Option+E

### Card Not Appearing

**Problem**: Card doesn't show up in card selector

**Solutions**:
1. Verify resource is added correctly
2. Check browser console for errors
3. Clear browser cache
4. Restart Home Assistant
5. Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Media Player Not Working

**Problem**: Card doesn't update when media plays

**Solutions**:
1. Verify media player entity ID:
   ```yaml
   # Go to Developer Tools → States
   # Find your media player entity
   # Copy exact entity ID
   ```

2. Check media player attributes:
   - Required: `entity_picture`, `media_title`, `media_duration`
   - Test in Developer Tools → States

3. Try different media player:
   ```yaml
   media_player: media_player.plex_player  # Instead of apple_tv
   ```

### Weather Not Showing

**Problem**: Weather widget doesn't appear

**Solutions**:
1. Ensure weather integration is set up
2. Check weather entity exists:
   - Go to Developer Tools → States
   - Search for your weather entity

3. Verify configuration:
   ```yaml
   show_weather: true
   weather_entity: weather.home  # Must match your entity
   ```

### Performance Issues

**Problem**: Card is slow or laggy

**Solutions**:
1. Reduce poster file sizes:
   ```bash
   # Resize images (requires ImageMagick)
   convert poster.jpg -resize 1500x poster_optimized.jpg
   ```

2. Increase slide interval:
   ```yaml
   slide_interval: 60  # Slower transitions
   ```

3. Reduce transition duration:
   ```yaml
   transition_duration: 500  # Faster transitions
   ```

4. Use local files instead of URLs

## Advanced Configuration

### Auto-Populate Posters from Directory

If you have many posters, you can use a template:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/movie1.jpg
  - /local/posters/movie2.jpg
  # Add more as needed
```

### Multiple Cards for Different Rooms

```yaml
# Living Room
type: custom:movie-poster-card
media_player: media_player.living_room_tv
posters:
  - /local/posters/family/movie1.jpg
title: "Living Room"

# Bedroom
type: custom:movie-poster-card
media_player: media_player.bedroom_tv
posters:
  - /local/posters/relaxing/movie1.jpg
title: "Bedroom"
```

### Genre-Based Collections

```yaml
# Action Movies
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /local/posters/action/mad_max.jpg
  - /local/posters/action/john_wick.jpg
title: "Action Collection"
```

## Getting Help

If you're still having issues:

1. Check the [GitHub Issues](https://github.com/yourusername/movie-poster-card/issues)
2. Search for similar problems
3. Create a new issue with:
   - Your configuration (remove sensitive data)
   - Browser console errors
   - Home Assistant version
   - Screenshots

## Next Steps

- Customize colors and styling (coming soon)
- Set up automations to change posters based on time/mood
- Create themed collections (Holiday movies, 80s classics, etc.)
- Integrate with Plex/Jellyfin for automatic poster updates

Enjoy your new Movie Poster Card! 🎬
