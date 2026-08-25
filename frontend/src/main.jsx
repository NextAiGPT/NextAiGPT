const redirect = sessionStorage.getItem('redirect');

if (redirect) {
  sessionStorage.removeItem('redirect');

  window.history.replaceState(
    null,
    '',
    `/NextAiGPT${redirect}`
  );
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import "./auth.css";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
