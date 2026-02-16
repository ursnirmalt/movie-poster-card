# Styling & Customization Guide

Complete guide to customizing the look, position, and behavior of widgets and elements in your Movie Poster Card.

## Table of Contents
- [Widget Positioning](#widget-positioning)
- [Widget Styling](#widget-styling)
- [Custom Styles with CSS](#custom-styles-with-css)
- [Layout Options](#layout-options)
- [Fullscreen & Toolbar](#fullscreen--toolbar)
- [Complete Examples](#complete-examples)

---

## Widget Positioning

### Available Positions

Time and weather widgets can be positioned at:
- `top-left`
- `top-right` (default)
- `top-center`
- `bottom-left`
- `bottom-right`
- `bottom-center`

### Basic Position Configuration

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters

# Position time widget
time_position: top-left

# Position weather widget
weather_position: top-right
```

### Examples by Use Case

**Wall Panel Configuration (Time top-left, Weather top-right)**
```yaml
type: custom:movie-poster-card
media_player: media_player.wall_tablet
poster_folder: /local/posters
time_position: top-left
weather_position: top-right
show_time: true
show_weather: true
weather_entity: weather.home
```

**Centered Info Bar**
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
time_position: top-center
weather_position: bottom-center
show_time: true
show_weather: true
weather_entity: weather.home
```

**Bottom Display**
```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
time_position: bottom-left
weather_position: bottom-right
show_time: true
show_weather: true
weather_entity: weather.home
```

---

## Widget Styling

### Built-in Widget Styles

Three preset styles are available:

#### 1. Glass (Default)
Glassmorphism with blur effect
```yaml
widget_style: glass
```

#### 2. Solid
Dark solid background
```yaml
widget_style: solid
```

#### 3. Minimal
Transparent, text only
```yaml
widget_style: minimal
```

### Comparing Widget Styles

```yaml
# Glass Style (Default) - Modern, translucent
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
widget_style: glass
show_time: true
show_weather: true
weather_entity: weather.home

# Solid Style - High contrast, easier to read
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
widget_style: solid
show_time: true
show_weather: true
weather_entity: weather.home

# Minimal Style - Clean, unobtrusive
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
widget_style: minimal
show_time: true
show_weather: true
weather_entity: weather.home
```

---

## Custom Styles with CSS

### Time Widget Custom Styles

Apply custom CSS properties to the time widget:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
show_time: true
time_position: top-right
time_style:
  font-size: 1.5rem
  font-weight: 700
  color: '#FFD700'
  background: 'rgba(0, 0, 0, 0.8)'
  padding: 1rem 2rem
  border-radius: 25px
  border: 2px solid rgba(255, 215, 0, 0.5)
```

### Weather Widget Custom Styles

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
show_weather: true
weather_entity: weather.home
weather_position: top-right
weather_style:
  font-size: 1.2rem
  background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.3), rgba(3, 169, 244, 0.3))'
  border: 2px solid rgba(33, 150, 243, 0.5)
  padding: 0.8rem 1.5rem
  border-radius: 20px
```

### Advanced Custom Styling Examples

**Large, Bold Time Display**
```yaml
time_style:
  font-size: 2.5rem
  font-weight: 900
  color: '#FFFFFF'
  text-shadow: '0 0 20px rgba(255, 255, 255, 0.5)'
  background: transparent
  padding: 1rem 1.5rem
```

**Compact Weather Widget**
```yaml
weather_style:
  font-size: 0.9rem
  padding: 0.4rem 0.8rem
  background: 'rgba(255, 255, 255, 0.1)'
  border-radius: 12px
  border: 1px solid rgba(255, 255, 255, 0.2)
```

**Colored Theme Widgets**
```yaml
time_style:
  background: 'rgba(156, 39, 176, 0.2)'
  border: 2px solid rgba(156, 39, 176, 0.5)
  color: '#E1BEE7'

weather_style:
  background: 'rgba(0, 150, 136, 0.2)'
  border: 2px solid rgba(0, 150, 136, 0.5)
  color: '#B2DFDB'
```

### All Available CSS Properties

You can customize these CSS properties:

```yaml
time_style:
  # Text
  font-size: '1rem'
  font-weight: '500'
  color: '#FFFFFF'
  letter-spacing: '0.5px'
  text-shadow: '0 2px 4px rgba(0,0,0,0.3)'
  
  # Background
  background: 'rgba(255, 255, 255, 0.1)'
  backdrop-filter: 'blur(10px)'
  
  # Border
  border: '1px solid rgba(255, 255, 255, 0.2)'
  border-radius: '18px'
  
  # Spacing
  padding: '0.6rem 1.2rem'
  margin: '0'
  
  # Effects
  box-shadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  opacity: '1'
```

---

## Layout Options

### Landscape Layout (Default)

Optimized for 16:9 displays, TVs, monitors
```yaml
layout: landscape
```

### Portrait Layout

Optimized for tablets, vertical displays
```yaml
layout: portrait
```

### Layout Comparison

```yaml
# Landscape - Wide screens
type: custom:movie-poster-card
media_player: media_player.living_room_tv
poster_folder: /local/posters
layout: landscape
show_time: true
show_weather: true
weather_entity: weather.home

# Portrait - Tablets
type: custom:movie-poster-card
media_player: media_player.tablet
poster_folder: /local/posters
layout: portrait
show_time: true
time_position: top-center
```

---

## Fullscreen & Toolbar

### Fullscreen Mode

Makes the card take up the entire viewport:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
fullscreen: true
```

**Use Cases:**
- Dedicated wall-mounted tablets
- Kiosk mode displays
- Digital picture frames
- Entertainment centers

### Hide Toolbar

Removes padding for edge-to-edge display:

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
hide_toolbar: true
```

**Use Cases:**
- Clean, minimal look
- Maximize screen usage
- Panel mode displays

### Combined Fullscreen + Hide Toolbar

```yaml
type: custom:movie-poster-card
media_player: media_player.wall_panel
poster_folder: /local/posters
fullscreen: true
hide_toolbar: true
layout: landscape
show_time: true
show_weather: true
weather_entity: weather.home
time_position: top-left
weather_position: top-right
```

---

## Complete Examples

### Example 1: Elegant Minimalist

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
poster_order: sequential
layout: landscape
widget_style: minimal
show_time: true
show_weather: false
time_position: bottom-right
time_style:
  font-size: 1.2rem
  font-weight: 300
  color: 'rgba(255, 255, 255, 0.9)'
  text-shadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
```

### Example 2: Bold & Colorful

```yaml
type: custom:movie-poster-card
media_player: media_player.apple_tv
poster_folder: /local/posters
auto_load_folder: true
poster_order: random
layout: landscape
widget_style: solid
show_time: true
show_weather: true
weather_entity: weather.home
time_position: top-left
weather_position: top-right
time_style:
  font-size: 1.8rem
  font-weight: 700
  color: '#FFD700'
  background: 'rgba(0, 0, 0, 0.9)'
  border: 3px solid #FFD700
  border-radius: 30px
  padding: 1rem 2rem
weather_style:
  font-size: 1.2rem
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  border: none
  border-radius: 25px
  padding: 0.8rem 1.5rem
```

### Example 3: Wall Panel Pro

```yaml
type: custom:movie-poster-card
media_player: media_player.wall_tablet
poster_folder: /local/posters
auto_load_folder: true
poster_order: random
slide_interval: 25
transition_duration: 1500
layout: landscape
fullscreen: true
hide_toolbar: true
widget_style: glass
show_time: true
show_weather: true
weather_entity: weather.home
show_now_playing_text: true
time_position: top-left
weather_position: top-right
time_style:
  font-size: 1.4rem
  font-weight: 600
weather_style:
  font-size: 1.2rem
```

### Example 4: Portrait Tablet

```yaml
type: custom:movie-poster-card
media_player: media_player.ipad
poster_folder: /local/posters
auto_load_folder: true
poster_order: sequential
layout: portrait
widget_style: glass
show_time: true
show_weather: true
weather_entity: weather.home
time_position: top-center
weather_position: bottom-center
time_style:
  font-size: 1.1rem
weather_style:
  font-size: 1rem
```

### Example 5: Home Theater Premium

```yaml
type: custom:movie-poster-card
media_player: media_player.theater_apple_tv
poster_folder: /local/posters/theater
auto_load_folder: true
poster_order: sequential
slide_interval: 45
transition_duration: 2000
layout: landscape
fullscreen: false
hide_toolbar: false
widget_style: glass
show_time: false
show_weather: false
show_now_playing_text: true
title: "Home Theater"
poster_fit: cover
```

### Example 6: Kids Room Fun

```yaml
type: custom:movie-poster-card
media_player: media_player.kids_tv
poster_folder: /local/posters/kids
auto_load_folder: true
poster_order: random
slide_interval: 15
layout: landscape
widget_style: solid
show_time: true
show_weather: false
time_position: top-left
time_style:
  font-size: 1.5rem
  font-weight: 700
  color: '#FF6B6B'
  background: 'rgba(255, 255, 255, 0.9)'
  border-radius: 20px
  padding: 0.8rem 1.5rem
title: "Kids Movies"
```

---

## Tips & Best Practices

### Widget Positioning Tips

1. **Avoid Overlaps**: If using both time and weather, position them on opposite corners
2. **Consider Content**: Position widgets where they won't cover important poster elements
3. **Test Both States**: Check widget placement when posters AND media are showing

### Styling Tips

1. **Contrast**: Ensure widgets are readable against both light and dark posters
2. **Consistency**: Match widget styles to your overall theme
3. **Size**: Larger widgets work better for wall panels, smaller for desktop cards
4. **Simplicity**: Don't over-style - the posters are the star

### Performance Tips

1. **Backdrop Blur**: Use sparingly, can impact performance on lower-end devices
2. **Transitions**: Longer transitions (1500-2000ms) are smoother but slower
3. **Fullscreen**: Only use when needed, can affect overall dashboard performance

### Accessibility Tips

1. **Contrast Ratios**: Maintain good contrast for readability
2. **Font Sizes**: Don't go below 0.9rem for widgets
3. **Touch Targets**: Keep widgets reasonably sized for touch interfaces

---

## Troubleshooting Styles

### Widgets Not Showing

**Check:**
- `show_time` or `show_weather` is set to `true`
- Weather entity is correct (for weather widget)
- Position values are valid

### Styles Not Applying

**Common Issues:**
- CSS property names must use quotes in YAML
- Values must include units (e.g., `1rem` not `1`)
- Color values need quotes (e.g., `'#FF0000'`)

**Example of correct syntax:**
```yaml
time_style:
  font-size: '1.5rem'  # ✅ Correct
  # font-size: 1.5rem  # ❌ Wrong (no quotes)
  # font-size: 1.5     # ❌ Wrong (no unit)
```

### Widgets Overlapping

**Solution:**
Position widgets on different corners or sides:
```yaml
time_position: top-left
weather_position: top-right
```

---

## Getting Creative

### Seasonal Themes

**Summer Beach Theme**
```yaml
time_style:
  color: '#FFA500'
  background: 'rgba(255, 165, 0, 0.2)'
weather_style:
  color: '#4FC3F7'
  background: 'rgba(79, 195, 247, 0.2)'
```

**Dark Noir Theme**
```yaml
widget_style: minimal
time_style:
  font-size: 1.8rem
  font-weight: 200
  color: 'rgba(255, 255, 255, 0.5)'
```

**Vibrant Pop Theme**
```yaml
time_style:
  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)'
  border: none
weather_style:
  background: 'linear-gradient(45deg, #F7DC6F, #BB8FCE)'
  border: none
```

---

Need more help? Check out the [main README](README.md) or [advanced guide](ADVANCED.md)!
