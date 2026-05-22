import { lightTheme } from './lightTheme';

export const darkTheme = {
  ...lightTheme,

  colors: {
    ...lightTheme.colors,

    background: '#121212',
    surface: '#1E1E1E',

    textPrimary: '#FFFFFF',
    textSecondary: '#D0D0D0',
  },
};