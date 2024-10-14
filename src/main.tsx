import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import Rules from './Rules.tsx'
import './index.css'
import './kit.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Rules />
  </StrictMode>,
)
