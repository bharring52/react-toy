import React from 'react';
import './App.css';
import { Board } from './components/board/board.js';

function App() {
  return (
    <div><Board rows={20} columns={20} /></div>
  );
}

export default App;
