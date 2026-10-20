import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeId, ThemeConfig, THEMES } from '../types/theme';

interface ThemeContextType {
  currentTheme: ThemeConfig;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to 'sunset-bronze' matching Poster 3 (warm sunset champagne) or stored preference
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gc_theme') as ThemeId;
      if (saved && THEMES[saved]) return saved;
    }
    return 'sunset-bronze';
  });

  const currentTheme = THEMES[themeId] || THEMES['sunset-bronze'];

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // Set CSS custom properties on root
    root.style.setProperty('--color-primary', currentTheme.primary);
    root.style.setProperty('--color-primary-rgb', currentTheme.primaryRgb);
    root.style.setProperty('--color-primary-light', currentTheme.primaryLight);
    root.style.setProperty('--color-primary-dark', currentTheme.primaryDark);
    root.style.setProperty('--color-accent-bar', currentTheme.accentBar);
    root.style.setProperty('--color-bg-base', currentTheme.bgBase);
    root.style.setProperty('--color-bg-surface', currentTheme.bgSurface);
    root.style.setProperty('--color-bg-card', currentTheme.bgCard);
    root.style.setProperty('--color-border-subtle', currentTheme.borderSubtle);
    root.style.setProperty('--color-border-focus', currentTheme.borderFocus);
    root.style.setProperty('--color-glow', currentTheme.glow);
    root.style.setProperty('--color-badge-bg', currentTheme.badgeBg);
    root.style.setProperty('--color-btn-bg', currentTheme.btnBg);
    root.style.setProperty('--color-btn-text', currentTheme.btnText);
    root.style.setProperty('--color-btn-border', currentTheme.btnBorder);
    root.style.setProperty('--color-waterline', currentTheme.waterlineColor);
    root.style.setProperty('--color-selection', currentTheme.selectionBg);

    // Apply background color to body
    document.body.style.backgroundColor = currentTheme.bgBase;

    localStorage.setItem('gc_theme', themeId);
  }, [currentTheme, themeId]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeId,
        setTheme: setThemeId,
        availableThemes: Object.values(THEMES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
