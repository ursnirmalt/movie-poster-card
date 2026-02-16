# CORRECT Configuration for /media/posters

## ✅ The Right Way (Like Wall-Panel Does It)

Your posters are in `/config/media/posters/`. Here's the **correct** configuration:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_path: media-source://media_source/local/posters
poster_order: random
```

That's it! The card will automatically discover all images in that folder.

## 📍 Understanding poster_path

The `poster_path` uses Home Assistant's media browser format:

```
media-source://media_source/local/FOLDER_NAME
```

**Examples:**

| Your Files Location | poster_path Value |
|---------------------|-------------------|
| `/config/media/posters/` | `media-source://media_source/local/posters` |
| `/config/media/movies/` | `media-source://media_source/local/movies` |
| `/config/media/wallpapers/` | `media-source://media_source/local/wallpapers` |
| `/config/media/photos/vacation/` | `media-source://media_source/local/photos/vacation` |

## 🎬 Complete Working Example

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_path: media-source://media_source/local/posters
poster_order: random
slide_interval: 30
show_time: true
show_weather: true
weather_entity: weather.home
title: "Movie Collection"
layout: landscape
widget_style: glass
time_position: top-left
weather_position: top-right
```

## 🔧 If You Have Subdirectories

### For /config/media/posters/action/

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_path: media-source://media_source/local/posters/action
title: "Action Movies"
```

### For /config/media/posters/scifi/

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_path: media-source://media_source/local/posters/scifi
title: "Sci-Fi Movies"
```

## ⚙️ Requirements

1. **Media Source Integration** must be enabled (it's enabled by default)
2. Files must be in `/config/media/` folder structure
3. Supported formats: JPG, JPEG, PNG, WebP, GIF

## 🧪 Test Your Configuration

### Step 1: Verify Media Browser Access

1. Go to **Media** in Home Assistant sidebar
2. Click **Local Media**
3. Navigate to your `posters` folder
4. You should see your poster images

If you can see them here, the card will work!

### Step 2: Add the Card

Use this minimal config first:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_path: media-source://media_source/local/posters
```

### Step 3: Check Browser Console

1. Press **F12** to open developer tools
2. Go to **Console** tab
3. Look for: `Loaded X posters from media browser`
4. If you see errors, share them!

## 🚫 Common Mistakes (Don't Do This)

### ❌ Wrong: Old path format
```yaml
poster_folder: /media/posters
auto_load_folder: true
```

### ❌ Wrong: Manual list (not needed anymore!)
```yaml
posters:
  - /media/posters/movie1.jpg
  - /media/posters/movie2.jpg
```

### ✅ Correct: Media source format
```yaml
poster_path: media-source://media_source/local/posters
```

## 📁 File Organization Tips

### Keep it simple:
```
/config/media/posters/
├── inception.jpg
├── interstellar.jpg
├── tenet.jpg
└── dunkirk.jpg
```

### Or organize by genre:
```
/config/media/posters/
├── action/
│   ├── mad-max.jpg
│   └── john-wick.jpg
├── scifi/
│   ├── blade-runner.jpg
│   └── arrival.jpg
└── kids/
    ├── toy-story.jpg
    └── frozen.jpg
```

Then create separate cards for each genre with the appropriate `poster_path`.

## 🎨 Full Configuration Options

```yaml
type: custom:movie-poster-card

# Required
media_player: media_player.apple_tv

# Poster source (this is the key setting!)
poster_path: media-source://media_source/local/posters

# Poster behavior
poster_order: random  # or 'sequential'
slide_interval: 30  # seconds

# Layout
layout: landscape  # or 'portrait'
fullscreen: false
hide_toolbar: false
poster_fit: cover  # or 'contain'

# Widgets
show_time: true
time_position: top-right
show_weather: true
weather_entity: weather.home
weather_position: top-right
widget_style: glass  # or 'solid', 'minimal'

# Display
show_now_playing_text: true
title: "Movie Collection"
transition_duration: 1000

# Custom styles (optional)
time_style:
  font-size: 1.2rem
weather_style:
  font-size: 1.2rem
```

## 🆘 Troubleshooting

### Posters Not Loading?

**1. Check media browser:**
- Go to Media → Local Media
- Can you see your posters folder?
- Can you see the images?

**2. Check browser console (F12):**
Look for these messages:
- ✅ `Loaded X posters from media browser` - Working!
- ❌ `Failed to load from media browser` - Check poster_path
- ❌ `media_source integration` - Enable media_source

**3. Verify poster_path format:**
```yaml
# Correct format
poster_path: media-source://media_source/local/posters

# NOT these
poster_path: /media/posters  # Wrong!
poster_path: /config/media/posters  # Wrong!
poster_path: local/posters  # Wrong!
```

### Still Not Working?

Share this info:
1. Your configuration (copy-paste)
2. Browser console output (F12)
3. Can you see posters in Media → Local Media?

## 🎯 Why This Works

This implementation uses Home Assistant's **Media Source API**, the same way wall-panel card does it. 

- ✅ Automatically discovers all images in folder
- ✅ No manual file listing needed
- ✅ Works with subdirectories
- ✅ Handles all image formats
- ✅ Respects Home Assistant's media structure

The previous versions tried to guess filenames, which was unreliable. This version properly queries Home Assistant's media browser to get the actual file list.

---

**That's it!** No more manual poster lists. Just point to your media folder and it works. 🎬
