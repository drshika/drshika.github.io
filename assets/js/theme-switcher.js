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