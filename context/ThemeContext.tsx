'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  toggleDarkMode: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start with a default state (true for dark mode)
  const [darkMode, setDarkMode] = useState(true);
  // Add a state to track if we've mounted to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  // This effect runs once on mount to initialize the theme from localStorage
  // We only run this after hydration is complete
  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem('theme');
      // Only set the state if we have a saved preference
      // otherwise keep the default (true/dark)
      if (savedTheme === 'light') {
        setDarkMode(false);
      } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setDarkMode(false);
      }
    } catch (e) {
      console.error('Error reading theme from localStorage:', e);
    }
  }, []);

  // This effect applies the dark mode class whenever darkMode state changes
  // AND we've mounted (preventing hydration mismatch)
  useEffect(() => {
    if (!mounted) return;

    if (darkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {
        console.error('Error saving theme to localStorage:', e);
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {
        console.error('Error saving theme to localStorage:', e);
      }
    }
  }, [darkMode, mounted]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Use a safe version of the context value that doesn't cause hydration mismatch
  const contextValue = {
    darkMode: darkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
