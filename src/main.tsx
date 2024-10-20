import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import Rules from './Rules.tsx'
import './css-styles/index.css'
import './css-styles/kit.css'
import './css-styles/title-fonts.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Rules />
    </BrowserRouter>
  </StrictMode>,
)
