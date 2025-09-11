import { useState, useEffect } from 'react';
import { Theme, themes } from '@/types/theme';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('forest-calm');

  useEffect(() => {
    const savedTheme = localStorage.getItem('studyzen-theme') as Theme;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('studyzen-theme', theme);
  };

  return {
    currentTheme,
    themeConfig: themes[currentTheme],
    changeTheme,
    availableThemes: Object.values(themes),
  };
}
