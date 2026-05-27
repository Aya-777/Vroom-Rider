import React from 'react';
import { themes } from './themes';
import { useThemeStore } from '../store/themeStore';

export const ThemeContext = React.createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const mode = useThemeStore((state) => state.mode);

  const theme = themes[mode];

  return (
    <ThemeContext.Provider value={{ ...theme, mode }}>
      {children}
    </ThemeContext.Provider>
  );
};