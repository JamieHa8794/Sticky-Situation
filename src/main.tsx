import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './styles/tokens.css';
import './styles/global.css';
import './styles/button.css';
import './styles/input.css';
import './styles/icons.css';
import './styles/badges.css';
import './styles/modal.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
