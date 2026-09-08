(function () {
  'use strict';

  // DOM Elements
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeStatusText = document.getElementById('theme-status');
  const rootElement = document.documentElement;

  // LocalStorage Key
  const STORAGE_KEY = 'theme';

  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  /**
   * Apply the theme to document root and update UI indicator
   * @param {string} theme - 'dark' | 'light'
   * @param {boolean} persist - whether to save to localStorage
   */
  function applyTheme(theme, persist = false) {
    rootElement.setAttribute('data-theme', theme);

    if (themeStatusText) {
      themeStatusText.textContent = theme.toUpperCase();
    }

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      themeToggleBtn.setAttribute(
        'aria-label',
        `Current theme is ${theme}. Click to switch to ${theme === 'dark' ? 'light' : 'dark'} mode.`
      );
    }

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (err) {
        console.warn('Unable to persist theme to localStorage:', err);
      }
    }
  }

  /**
   * Toggle between 'dark' and 'light'
   */
  function toggleTheme() {
    const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  }

  // Initialize theme on DOM ready
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme, false);

  // Attach click listener to toggle button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    const userSaved = localStorage.getItem(STORAGE_KEY);
    if (!userSaved) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme, false);
    }
  });

  
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    profileImg.addEventListener('error', function () {
      this.classList.add('img-fallback');
    });
  }
})();
