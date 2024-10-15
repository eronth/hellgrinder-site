import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import Rules from './Rules.tsx'
import './css-styles/index.css'
import './css-styles/kit.css'
import './css-styles/title-fonts.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Rules />
  </StrictMode>,
)
