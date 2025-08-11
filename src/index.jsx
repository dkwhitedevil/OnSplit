import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/tailwind.css";
import "./styles/index.css";
import { AppKitProvider } from './providers/AppKitProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppKitProvider>
      <App />
    </AppKitProvider>
  </React.StrictMode>
);
