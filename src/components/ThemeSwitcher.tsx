import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { ColorMode, FactionTheme } from '../types/theme';
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
  const { colorMode, factionTheme, setColorMode, setFactionTheme } = useTheme();

  const factionThemes: { value: FactionTheme; label: string }[] = [
    { value: 'ashborn', label: 'Ashborn' },
    { value: 'stoneveined', label: 'Stoneveined' },
    { value: 'thornwraith', label: 'Thornwraith' },
    { value: 'umbral', label: 'Umbral' },
    { value: 'vastfathom', label: 'Vastfathom' },
    { value: 'zephpter', label: 'Zephpter' },
    { value: 'wanderlost', label: 'Wanderlost' },
  ];

  const colorModes: { value: ColorMode; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '🖥️' },
  ];

  return (
    <div className="theme-switcher">
      <div className="theme-switcher-section">
        <label className="theme-switcher-label">Mode:</label>
        <div className="theme-switcher-buttons">
          {colorModes.map((mode) => (
            <button
              key={mode.value}
              className={`theme-switcher-button ${colorMode === mode.value ? 'active' : ''}`}
              onClick={() => setColorMode(mode.value)}
              title={mode.label}
            >
              <span className="theme-switcher-icon">{mode.icon}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="theme-switcher-section">
        <label className="theme-switcher-label">Faction:</label>
        <div className="theme-switcher-buttons">
          {factionThemes.map((theme) => (
            <button
              key={theme.value}
              className={`theme-switcher-button faction-button ${factionTheme === theme.value ? 'active' : ''}`}
              onClick={() => setFactionTheme(theme.value)}
              data-faction={theme.value}
              title={theme.label}
            >
              {theme.label.charAt(0)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
