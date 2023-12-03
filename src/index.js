import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login1 from './Register/Login1';
import App from './App';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login1 />} /> {/* Page de connexion */}
      <Route path="/app/*" element={<App />} /> {/* Pages de l'application */}
    </Routes>
  </Router>,
  document.getElementById('root')
);
