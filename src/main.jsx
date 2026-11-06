import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './ui/App.jsx';
import './styles.css';
import './guide.css';
import './mobile.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
