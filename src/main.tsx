import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './styles/base/tokens.css';
import './styles/base/global.css';
import './styles/UI/button.css';
import './styles/UI/input.css';
import './styles/UI/icons.css';
import './styles/UI/badges.css';
import './styles/UI/modal.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
