---
layout: post
title: Themed Styles With Sass 1.80.0
excerpt_separator: <!--more-->
toc: true
tags: [webdev, sass, jekyll]
---

When I first started writing the code for this website, I had cobbled together styles from [Cayman](https://github.com/pages-themes/cayman), [Rouge](https://github.com/pages-themes/cayman) and a good amount of [Coolors](https://coolors.co/) to iterate on the color schemes. But as my site started to grow and things started to get more messy to mantain, I was looking to refactor my code and create a Jekyll theme that anyone can use. The result of this is [Jekyll Theme Manpage](https://github.com/drshika/jekyll-theme-manpage): a theme that is a cuter version of the classic Linux Manpage. One of the challenges I came across when I was creating this theme was the colors. 
<!--more-->

## The Challenge

I wanted to go beyond the typical light/dark mode toggle using [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme). My goal was to create multiple color schemes (skins) that users could:
1. Apply without modifying the core theme files
2. Switch between dynamically
3. Maintain both light and dark mode variants

Some of the projects I used as inspiration were [Minima](https://github.com/jekyll/minima) and [Jek](https://github.com/tcbutler320/jek). However, the challenge I found with adopting their code is that they use the deprecated `@import` to load styles in the scss files. I didn't want any users to deal with eventually deprecated features so I had to figure out how to make the site work with `@use` to load the stylesheets. 

I noticed that in Minima, all the colors were declared in multiple files in a folder called skins and they used liquid to determine what theme the user chose and to load it properly. While this was headed in the right direction for me, `@use` didn't function in the same wau that `@import` does. 

Here's how I solved this problem. 

## The Architecture

### 1. Three-Layer Variable System
The theme uses a three-layer approach to handle colors:

```scss
// 1. Base SCSS variables (in _sass/skins/_purple.scss)
$theme-color: #663399;

// 2. CSS custom properties in :root
:root {
  --theme-color: #{$theme-color};
}

// 3. Usage in the theme through SCSS variables
$header-color: var(--theme-color);
```

This structure allows for both compile-time customization and runtime theme switching.

### 2. Skin Structure
Each skin file (e.g., `_purple.scss`, `_github.scss`) follows the same template:

```scss
// Light mode variables
:root {
  --theme-color: #{$theme-color};
  --bg-color: #{$bg-color};
  // ... other variables
}

// Dark mode overrides
[data-theme="dark"] {
  --theme-color: #{$dark-theme-color};
  --bg-color: #{$dark-bg-color};
  // ... other variables
}
```

### 3. Dynamic Loading with Jekyll

The key challenge was getting Jekyll and Sass to work together with dynamic themes. Here's how it works:

1. Jekyll processes Liquid templating first:
```scss
@forward "skins/{{ site.skin | default: 'purple'}}";
```

2. Then Sass processes the resulting file path. This wouldn't work with `@use`:
```scss
// ❌ Won't work - @use can't handle Liquid variables
@use "skins/{{ site.skin }}.scss";
```

3. Instead, we use `@forward` which makes variables available to files that `@use` our skin:
```scss
// ✅ Works - forwards variables to other files
@forward "skins/{{ site.skin | default: 'purple'}}";
```

### 4. Theme Switching

The theme switching is handled by a small JavaScript module that:
1. Checks system preferences
2. Applies the appropriate theme
3. Listens for system changes

```js
// Check for saved theme preference, otherwise use system preference
const getPreferredTheme = () => {
    // Always check system preference first
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // For testing/debugging: override localStorage with system preference
    const theme = prefersDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    return theme;
};

// Apply theme to document
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
};

// Initialize theme immediately
const initTheme = () => {
    const theme = getPreferredTheme();
    setTheme(theme);
};

// Run initialization as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    setTheme(e.matches ? 'dark' : 'light');
});
```

Make sure to include it in your `head-custom.html` so that it runs on every page in your site.

```html
<script src="{{ '/assets/js/theme-switcher.js' | relative_url }}"></script>
```

## Performance Considerations

This approach has several benefits:
1. Theme switching is instant (no page reload needed)
2. CSS custom properties are processed by the browser's CSS engine
3. Sass variables are compiled ahead of time
4. Each skin file is small and follows a consistent structure

## Creating New Themes

To create a new theme, simply:
1. Create a new file in `_sass/skins/` (e.g., `_mytheme.scss`)
2. Copy the structure from an existing skin
3. Update the color variables
4. Set `skin: mytheme` in your `_config.yml`

This approach gives us the best of both worlds: dynamic theme switching through Jekyll's configuration while maintaining modern Sass practices with `@use`.
