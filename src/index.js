import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import './index.css';
import { ToastContainer } from 'react-toastify';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
     <ToastContainer autoClose={2000}/>
      <App />
  </React.StrictMode>
);


