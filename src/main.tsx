import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Rules from './Rules.tsx'
import './css-styles/index.css'
import './css-styles/kit.css'
import './css-styles/title-fonts.css'
import './css-styles/nav.css'
import './css-styles/creature-card.css'
import './css-styles/attack-mode.css'
import './css-styles/magic-spell.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Rules />
    </BrowserRouter>
  </StrictMode>,
)
