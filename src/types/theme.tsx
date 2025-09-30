export type ColorMode = 'light' | 'dark' | 'system';
export type FactionTheme = 'ashborn' | 'stoneveined' | 'thornwraith' | 'umbral' | 'vastfathom' | 'zephpter' | 'wanderlost';

export interface ThemeContextType {
  colorMode: ColorMode;
  factionTheme: FactionTheme;
  setColorMode: (mode: ColorMode) => void;
  setFactionTheme: (theme: FactionTheme) => void;
  isDarkMode: boolean;
};
