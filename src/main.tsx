import { ThemeProvider } from 'mantra-theme-switcher';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/Home';
import './styles/global/main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider
      settings={{
        initialState: 'light',
        matchDevicePreference: 'initialy',
        savePreference: true,
      }}
    >
      <Home />
    </ThemeProvider>
  </React.StrictMode>,
);
