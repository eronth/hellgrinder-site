export type ColorMode = 'light' | 'dark' | 'system';
export type FactionTheme = 'default' | 'ashborn' | 'stoneveined' | 'thornwraith' | 'umbral' | 'vastfathom' | 'zephpter' | 'wanderlost';
export type RetroTheme = 'none' | 'retro-deco' | 'retro-atompunk' | 'retro-western' | 'retro-nouveau' | 'retro-bauhaus' | 'retro-midcentury' | 'retro-psychedelic' | 'retro-memphis' | 'retro-grunge' | 'retro-future' | 'retro-victorian' | 'retro-stellar';

export interface ThemeContextType {
  colorMode: ColorMode;
  factionTheme: FactionTheme;
  retroTheme: RetroTheme;
  setColorMode: (mode: ColorMode) => void;
  setFactionTheme: (theme: FactionTheme) => void;
  setRetroTheme: (theme: RetroTheme) => void;
  isDarkMode: boolean;
};
