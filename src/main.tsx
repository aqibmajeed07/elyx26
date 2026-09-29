import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Automatically purge legacy cached events & registrations for production
const CURRENT_CACHE_VERSION = 'elyx26_v2';
try {
  if (localStorage.getItem('elyx26_cache_version') !== CURRENT_CACHE_VERSION) {
    localStorage.removeItem('elyx26_events_cache');
    localStorage.removeItem('elyx26_registrations_cache');
    localStorage.removeItem('artifex_registrations_cache');
    localStorage.setItem('elyx26_cache_version', CURRENT_CACHE_VERSION);
  }
} catch {
  // Ignore
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
