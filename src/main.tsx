import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Rules from './Rules.tsx'
import './css-styles/theme-system.css'
import './css-styles/index.css'
import './css-styles/kit.css'
import './css-styles/title-fonts.css'
import './css-styles/creature-card.css'
import './css-styles/attack-mode.css'
import './css-styles/magic-spell.css'
import './css-styles/toggle.css'
import './css-styles/rule-popup.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Rules />
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
)
