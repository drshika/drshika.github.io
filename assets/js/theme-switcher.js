// Check for saved theme preference, otherwise use system preference
const getPreferredTheme = () => {
    // Always check system preference first
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('System prefers dark mode:', prefersDark);
    
    // For testing/debugging: override localStorage with system preference
    const theme = prefersDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    return theme;
};

// Apply theme to document
const setTheme = (theme) => {
    console.log('Setting theme to:', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
};

// Initialize theme immediately
const initTheme = () => {
    const theme = getPreferredTheme();
    console.log('Initializing theme:', theme);
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
    console.log('System theme changed:', e.matches ? 'dark' : 'light');
    setTheme(e.matches ? 'dark' : 'light');
});

// Log initial state
console.log('Initial state:', {
    'data-theme': document.documentElement.getAttribute('data-theme'),
    'color-scheme': document.documentElement.style.colorScheme,
    'root-bg': getComputedStyle(document.documentElement).getPropertyValue('--bg-color'),
    'root-color': getComputedStyle(document.documentElement).getPropertyValue('--text-color')
});