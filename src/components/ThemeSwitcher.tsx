import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, 
  faMoon, 
  faDesktop,
  faBan,
  faGem,
  faAtom,
  faHatCowboy,
  faSeedling,
  faSquare,
  faBuilding,
  faPeace,
  faShapes,
  faGuitar,
  faRocket,
  faHatWizard,
  faStar,
  faFire,
  faMountain,
  faLeaf,
  faEye,
  faWater,
  faWind,
  faCompass,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../hooks/useTheme';
import { ColorMode, FactionTheme, RetroTheme } from '../types/theme';
import './ThemeSwitcher.css';

enum LightDarkMode {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
};

const ThemeSwitcher: React.FC = () => {
  const show = 'nah';
  const { colorMode, factionTheme, retroTheme, setColorMode, setFactionTheme, setRetroTheme } = useTheme();

  const factionThemes: { value: FactionTheme; label: string; icon: IconDefinition }[] = [
    { value: 'ashborn', label: 'Ashborn', icon: faFire },
    { value: 'stoneveined', label: 'Stoneveined', icon: faMountain },
    { value: 'thornwraith', label: 'Thornwraith', icon: faLeaf },
    { value: 'umbral', label: 'Umbral', icon: faEye },
    { value: 'vastfathom', label: 'Vastfathom', icon: faWater },
    { value: 'zephpter', label: 'Zephpter', icon: faWind },
    { value: 'wanderlost', label: 'Wanderlost', icon: faCompass },
  ];

  const retroThemes: { value: RetroTheme; label: string; icon: IconDefinition }[] = [
    { value: 'none', label: 'None', icon: faBan },
    { value: 'retro-deco', label: 'Art Deco', icon: faGem },
    { value: 'retro-atompunk', label: 'Atompunk', icon: faAtom },
    { value: 'retro-western', label: 'Western', icon: faHatCowboy },
    { value: 'retro-nouveau', label: 'Art Nouveau', icon: faSeedling },
    { value: 'retro-bauhaus', label: 'Bauhaus', icon: faSquare },
    { value: 'retro-midcentury', label: 'Mid-Century', icon: faBuilding },
    { value: 'retro-psychedelic', label: 'Psychedelic', icon: faPeace },
    { value: 'retro-memphis', label: 'Memphis', icon: faShapes },
    { value: 'retro-grunge', label: 'Grunge', icon: faGuitar },
    { value: 'retro-future', label: 'Retro-Future', icon: faRocket },
    { value: 'retro-victorian', label: 'Victorian', icon: faHatWizard },
    { value: 'retro-stellar', label: 'Stellar', icon: faStar },
  ];

  const getColorModeIndex = (mode: ColorMode): number => {
    switch (mode) {
      case 'light': return 0;
      case 'system': return 1;
      case 'dark': return 2;
      default: return 1;
    }
  };

  const getColorModeFromIndex = (index: number): ColorMode => {
    return LightDarkMode.Dark;
    switch (index) {
      case 0: return LightDarkMode.Light;
      case 1: return LightDarkMode.System;
      case 2: return LightDarkMode.Dark;
      default: return LightDarkMode.System;
    }
  };

  const handleToggleClick = () => {
    const currentIndex = getColorModeIndex(colorMode);
    const nextIndex = (currentIndex + 1) % 3;
    setColorMode(getColorModeFromIndex(nextIndex));
  };

  return (<>{
    (show == 'nah')
    ? null 
    : <div className="theme-switcher">
      <div className="theme-switcher-section">
        <label className="theme-switcher-label">Mode:</label>
        <div className={`color-mode-toggle mode-${colorMode}`} onClick={handleToggleClick}>
          <div className="toggle-track">
            <div className="toggle-labels">
              <span className="toggle-label light" title="Light Mode">
                <FontAwesomeIcon icon={faSun} />
              </span>
              <span className="toggle-label system" title="System Mode">
                <FontAwesomeIcon icon={faDesktop} />
              </span>
              <span className="toggle-label dark" title="Dark Mode">
                <FontAwesomeIcon icon={faMoon} />
              </span>
            </div>
            <div 
              className={`toggle-slider ${colorMode}`}
              style={{ transform: `translateX(${getColorModeIndex(colorMode) * 33.333}%)` }}
            />
          </div>
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
              <FontAwesomeIcon icon={theme.icon} />
            </button>
          ))}
        </div>
      </div>

      <div className="theme-switcher-section">
        <label className="theme-switcher-label">Retro:</label>
        <div className="theme-switcher-buttons">
          {retroThemes.map((theme) => (
            <button
              key={theme.value}
              className={`theme-switcher-button retro-button ${retroTheme === theme.value ? 'active' : ''}`}
              onClick={() => setRetroTheme(theme.value)}
              data-retro={theme.value}
              title={theme.label}
            >
              <span className="theme-switcher-icon">
                <FontAwesomeIcon icon={theme.icon} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  }</>);
};

export default ThemeSwitcher;
