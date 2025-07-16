import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* 👈 Wrap App here */}
    <App />
    </UserProvider>
  </React.StrictMode>
);

// reportWebVitals(); // Removed as file no longer exists
