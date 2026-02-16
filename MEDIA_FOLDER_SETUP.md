# Media Folder Setup Guide

Complete guide for setting up posters from your `/media/posters` folder.

## 🎯 Quick Setup for /media/posters

If your posters are in `/config/media/posters`, use this configuration:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /media/posters
auto_load_folder: true
poster_order: random
```

## 📁 Understanding File Paths

### /media vs /local

**`/media/` folder:**
- Physical location: `/config/media/`
- Access in card: `/media/`
- Example: `/config/media/posters/inception.jpg` → `/media/posters/inception.jpg`
- **Best for:** Large media libraries, Plex/Jellyfin posters

**`/local/` folder (www):**
- Physical location: `/config/www/`
- Access in card: `/local/`
- Example: `/config/www/posters/inception.jpg` → `/local/posters/inception.jpg`
- **Best for:** Custom posters, smaller collections

## 🔧 Configuration Examples

### For /media/posters

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /media/posters
auto_load_folder: true
```

### For /local/posters (www)

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
```

### For Plex/Jellyfin metadata folders

```yaml
type: custom:movie-poster-card
media_player: media_player.plex
poster_folder: /media/library/movies
auto_load_folder: true
```

## 🗂️ File Organization

### Recommended Structure

```
/config/media/posters/
├── poster1.jpg
├── poster2.jpg
├── poster3.jpg
└── poster4.jpg
```

Or organized by genre:

```
/config/media/posters/
├── action/
│   ├── poster1.jpg
│   └── poster2.jpg
├── scifi/
│   ├── poster1.jpg
│   └── poster2.jpg
└── kids/
    ├── poster1.jpg
    └── poster2.jpg
```

### Naming Conventions

The card auto-detects these naming patterns:

**Numbered posters:**
- `poster1.jpg`, `poster2.jpg`, ... `poster100.jpg`
- `cover1.jpg`, `cover2.jpg`, etc.
- `movie1.jpg`, `movie2.jpg`, etc.

**With separators:**
- `poster_1.jpg`, `poster-1.jpg`
- `cover_1.jpg`, `cover-1.jpg`

**Supported extensions:**
- `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`

## ✅ Manual Poster List (Recommended for /media)

For the most reliable results with `/media/` folders, explicitly list your posters:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /media/posters/inception.jpg
  - /media/posters/interstellar.jpg
  - /media/posters/tenet.jpg
  - /media/posters/dunkirk.jpg
  - /media/posters/the-prestige.jpg
poster_order: random
```

### Generate Your Poster List

**Using SSH or Terminal:**
```bash
# Navigate to your media folder
cd /config/media/posters

# List all jpg files
ls -1 *.jpg | sed 's/^/  - \/media\/posters\//'

# Or for all image formats
ls -1 *.{jpg,jpeg,png,webp} 2>/dev/null | sed 's/^/  - \/media\/posters\//'
```

Copy the output directly into your configuration!

## 🔍 Troubleshooting

### Posters Not Loading from /media

**Problem:** Card shows blank or posters aren't appearing

**Solution 1: Use Manual List**
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /media/posters/movie1.jpg
  - /media/posters/movie2.jpg
  # Add all your posters
```

**Solution 2: Check File Names**
Rename your files to match supported patterns:
```bash
# Rename files to poster1.jpg, poster2.jpg, etc.
cd /config/media/posters
counter=1
for file in *.jpg; do
  mv "$file" "poster${counter}.jpg"
  ((counter++))
done
```

**Solution 3: Verify File Paths**
```yaml
# Wrong ❌
poster_folder: /config/media/posters
poster_folder: media/posters
poster_folder: ~/media/posters

# Correct ✅
poster_folder: /media/posters
```

### Permission Issues

**Check file permissions:**
```bash
ls -la /config/media/posters/

# Should show something like:
# -rw-r--r-- 1 root root 123456 Feb 17 10:00 poster1.jpg
```

**Fix permissions if needed:**
```bash
chmod 644 /config/media/posters/*.jpg
chmod 755 /config/media/posters
```

### Test Individual Posters

Add a single poster first to test:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /media/posters/test.jpg
show_time: false
show_weather: false
```

Then check browser console (F12) for errors.

## 🎨 Complete Working Examples

### Example 1: Media Folder with Manual List

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
posters:
  - /media/posters/action/mad-max-fury-road.jpg
  - /media/posters/action/john-wick.jpg
  - /media/posters/scifi/blade-runner-2049.jpg
  - /media/posters/scifi/arrival.jpg
  - /media/posters/scifi/interstellar.jpg
  - /media/posters/drama/1917.jpg
poster_order: random
slide_interval: 30
show_time: true
show_weather: true
weather_entity: weather.home
title: "Movie Collection"
```

### Example 2: Plex Posters

```yaml
type: custom:movie-poster-card
media_player: media_player.plex
posters:
  - /media/plex/library/movies/Inception/poster.jpg
  - /media/plex/library/movies/Interstellar/poster.jpg
  - /media/plex/library/movies/Tenet/poster.jpg
poster_order: sequential
title: "Plex Library"
```

### Example 3: Local Folder (www)

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
poster_order: random
```

## 🚀 Best Practices

### 1. Start with Manual List
For `/media/` folders, explicitly listing posters is most reliable:
```yaml
posters:
  - /media/posters/poster1.jpg
  - /media/posters/poster2.jpg
```

### 2. Use Consistent Naming
Name files: `poster1.jpg`, `poster2.jpg`, etc.

### 3. Optimize Images
```bash
# Resize to optimal size (1000-1500px width)
convert poster.jpg -resize 1500x2250 -quality 85 poster_optimized.jpg
```

### 4. Test Access
Create a simple markdown card to verify image access:
```yaml
type: markdown
content: |
  ![Test](/media/posters/poster1.jpg)
```

If the image shows, your path is correct!

## 📋 Configuration Checklist

- [ ] Files are in `/config/media/posters/` folder
- [ ] Files are named consistently (poster1.jpg, poster2.jpg, etc.)
- [ ] File extensions are lowercase (.jpg not .JPG)
- [ ] Files are readable (permissions 644)
- [ ] Configuration uses `/media/posters` (not `/config/media/posters`)
- [ ] Tested with manual poster list first
- [ ] Browser console shows no errors (F12)

## 💡 Pro Tips

### Tip 1: Generate Config from Files
```bash
cd /config/media/posters
echo "posters:"
ls -1 *.jpg | while read file; do
  echo "  - /media/posters/$file"
done
```

### Tip 2: Symlink for Organization
```bash
# Create symlink to organize posters
ln -s /config/media/library/movies /config/media/posters
```

### Tip 3: Use Subdirectories
```yaml
# Action movies
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /media/posters/action
posters:
  - /media/posters/action/movie1.jpg
  - /media/posters/action/movie2.jpg

# Sci-fi movies
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /media/posters/scifi
posters:
  - /media/posters/scifi/movie1.jpg
  - /media/posters/scifi/movie2.jpg
```

## 🆘 Still Having Issues?

### Debug Steps

1. **Verify folder exists:**
   ```bash
   ls -la /config/media/posters/
   ```

2. **Test file access in browser:**
   Navigate to: `http://YOUR_HA_IP:8123/media/posters/poster1.jpg`

3. **Check browser console:**
   - Open card page
   - Press F12
   - Look for errors in Console tab

4. **Try absolute path test:**
   ```yaml
   posters:
     - /media/posters/poster1.jpg
   ```

5. **Verify media source configuration:**
   Check `configuration.yaml` for media_dirs:
   ```yaml
   homeassistant:
     media_dirs:
       media: /media
   ```

### Common Error Messages

**"Failed to load image"**
- Check file path spelling
- Verify file exists
- Check file permissions

**"Cannot read property"**
- Configuration syntax error
- Check YAML indentation

**Blank card**
- No valid posters found
- Use manual poster list
- Check browser console

## 📚 Related Documentation

- [Quick Start Guide](QUICKSTART.md)
- [Installation Guide](INSTALLATION.md)
- [Styling Guide](STYLING.md)
- [Main README](README.md)

---

**Still stuck?** Open an issue on GitHub with:
- Your configuration (remove sensitive info)
- Directory listing: `ls -la /config/media/posters/`
- Browser console errors
- Home Assistant version
