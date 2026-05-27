export type ThemeMode = 'light' | 'dark';

export type Theme = {
  mode: ThemeMode;
  colors: Record<string, string>;
};