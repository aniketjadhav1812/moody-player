import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SongProvider } from './SongContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <SongProvider>
    <App />
  </SongProvider>
  </StrictMode>,
)
