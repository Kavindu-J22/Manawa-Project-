import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18+
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot for React 18+
root.render(
  <Router>
    <App />
  </Router>
);
