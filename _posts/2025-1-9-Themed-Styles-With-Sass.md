---
layout: post
title: Creating Jekyll Skins with Sass 1.80.0
excerpt_separator: <!--more-->
toc: true
tags: [webdev, sass, jekyll]
---

When I first started writing the code for this website, I had cobbled together styles from [Cayman](https://github.com/pages-themes/cayman), [Rouge](https://github.com/pages-themes/cayman) and a good amount of [Coolors](https://coolors.co/) to iterate on the color schemes. But as my site grew, I wanted to refactor the code into a reusable Jekyll theme: [Jekyll Theme Manpage](https://github.com/drshika/jekyll-theme-manpage), a cuter version of the classic Linux Manpage.

One of the challenges I faced was updating the theme to work with Sass 1.80.0, which shows this warning:
```
Warning: @import is deprecated and will be removed in Sass 2.0.0. Use @use instead.
```
<!--more-->

## The Challenge

I wanted to create multiple color schemes (skins) that users could:
1. Apply without modifying the core theme files
2. Support both light and dark mode variants
3. Work with modern Sass practices (`@use` instead of `@import`)

## The File Structure

Here's how the files work together:

```
your-jekyll-site/
├── _sass/
│   ├── skins/
│   │   ├── _purple.scss    # Default skin
│   │   └── _nord.scss      # Another skin
│   ├── _variables.scss     # Shared variables
│   └── jekyll-theme-manpage.scss  # Main theme styles
├── assets/
│   └── css/
│       └── style.scss      # Entry point
└── _config.yml            # Theme configuration
```

### 1. The Entry Point (`style.scss`)
This is where Jekyll starts processing your styles:

```scss:assets/css/style.scss
---
---

@forward "skins/{{ site.skin | default: 'purple'}}";
@use "variables";
@use "normalize";
@use "jekyll-theme-manpage";
```

Each line has a purpose:
1. Empty front matter tells Jekyll to process this file
2. `@forward` loads skin variables after Liquid processes `site.skin`
3. `@use` loads and scopes each module's styles and variables

### 2. Skin Files (`_sass/skins/_*.scss`)
```scss:_sass/skins/_purple.scss
// Base colors
$theme-color: #663399;
$bg-color: #ffffff;
// ... other base variables

// Light mode
:root {
  --theme-color: #{$theme-color};
  --bg-color: #{$bg-color};
  // ... other variables
}

// Dark mode
[data-theme="dark"] {
  --theme-color: #{$dark-theme-color};
  --bg-color: #{$dark-bg-color};
  // ... dark mode overrides
}
```
Each skin defines CSS custom properties that can be used throughout the theme. The `:root` selector sets default (light mode) values, while `[data-theme="dark"]` provides overrides for dark mode. We use Sass interpolation (`#{$variable}`) to convert Sass variables into CSS custom property values.


### 3. Variables (`_sass/_variables.scss`)
```scss:_sass/_variables.scss
// Breakpoints
$large-breakpoint: 64em !default;
$medium-breakpoint: 42em !default;

// Theme colors (from skin)
$theme-color: var(--theme-color) !default;
$bg-color: var(--bg-color) !default;
// ... other variables
```
This file creates Sass variables that reference our CSS custom properties. The `!default` flag allows these values to be overridden if they're defined elsewhere, making the theme more customizable. These variables are then used throughout other Sass files.

### 4. Main Theme (`_sass/jekyll-theme-manpage.scss`)

```scss:_sass/jekyll-theme-manpage.scss
@use "variables" as v;

body {
  background-color: v.$bg-color;
  color: v.$text-color;
}

// For semi-transparent colors, use modern CSS color syntax
.highlight {
  background: rgb(from var(--theme-color) r g b / 0.15);
}
```
The main theme file contains all core styles and uses the variables defined earlier. We use modern CSS color syntax (`rgb(from var())`) because Sass color functions can't directly manipulate CSS custom properties. The `@use` rule namespaces our variables to avoid conflicts.


### 5. Configuration (`_config.yml`)
Users can select their theme:

```yaml:_config.yml
title: My Jekyll Site
skin: purple  # Available: purple, github, nord
```
Jekyll's configuration file determines which skin to load through Liquid templating. This value is processed before Sass compilation, allowing users to switch themes by changing a single configuration value without modifying any CSS files.

## Optional: Theme Switching

While themes work without JavaScript (based on system preferences), you can add dynamic switching:

```js:assets/js/theme-switcher.js
// Apply theme to document
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
};

// Check system preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
}
```

Include it in your layout:

```html:_includes/head-custom.html
<script src="{{ '/assets/js/theme-switcher.js' | relative_url }}"></script>
```

## Creating New Themes

To create a new theme:

To create a new theme, add a skin file that follows the same structure as the existing ones:

```scss:_sass/skins/_mytheme.scss
// Define base colors
$theme-color: #your-color;
$bg-color: #ffffff;

:root {
  --theme-color: #{$theme-color};
  --bg-color: #{$bg-color};
}

[data-theme="dark"] {
  --theme-color: #{$dark-theme-color};
  --bg-color: #{$dark-bg-color};
}
```

The `:root` and the `[data-theme="dark"]` should be copy-paste from the existing theme files so all you need to do is define your colors. 

2. Update `_config.yml`:
```yaml
skin: mytheme
```

## Summary

1. Jekyll processes Liquid templating first (`{{ site.skin }}`), selecting the right skin file
2. `@forward` makes the skin's variables available to other files
3. CSS custom properties allow runtime theme switching
4. Modern CSS color syntax enables working with CSS variables in color functions

This approach gives us the best of both worlds: compile-time theme selection through Jekyll's configuration while maintaining modern Sass practices with `@use`.

References:
- [https://sass-lang.com/documentation/](https://sass-lang.com/documentation/)
- [https://jekyllrb.com/docs/](https://jekyllrb.com/docs/)