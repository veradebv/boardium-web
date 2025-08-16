import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Board from './components/Board/Board';
import './index.css';
import Register from './components/Auth/Register/Register';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
