import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementsByTagName("body")!.item(0)!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
