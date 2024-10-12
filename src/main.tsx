import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/pages/example';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
