import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Regist from './templates/Registration'
import HomePage  from './templates/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>

        <Route path="/" element={ <App />} />
        <Route path="/regist" element={<Regist/>} />
        <Route path="/home" element={<HomePage/>} />
       
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);


reportWebVitals();
