import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

function showRuntimeError(err: any) {
  try {
    const message = err && (err.stack || err.message || String(err));
    document.body.innerHTML = '';
    const container = document.createElement('div');
    container.style.whiteSpace = 'pre-wrap';
    container.style.padding = '16px';
    container.style.background = '#fff';
    container.style.color = '#b00020';
    container.style.fontFamily = 'monospace, monospace';
    container.style.fontSize = '13px';
    container.textContent = message;
    document.body.appendChild(container);
    console.error('Runtime error captured:', err);
  } catch (e) {
    console.error('Error displaying runtime error', e);
  }
}

window.addEventListener('error', (e) => {
  showRuntimeError((e as any).error || (e as any).message || e);
});
window.addEventListener('unhandledrejection', (e) => {
  showRuntimeError((e as any).reason || e);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
