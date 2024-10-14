import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App/App';

import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root')); 
root.render(
  <BrowserRouter>
    <App tab="home" />
  </BrowserRouter>
);

