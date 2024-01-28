import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/rwd.css';
import App from './App';
import { PostContextProvider } from './context/PostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostContextProvider>
      <App />
    </PostContextProvider>
  </React.StrictMode>
);
