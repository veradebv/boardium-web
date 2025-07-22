import React from 'react';
import Board from'./components/Board';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Boardium</h1>
      <Board/>
    </div>
  );
}

export default App;
