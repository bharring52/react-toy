import React from 'react';
import './App.css';
import { Board } from './components/board/board.js';

function App() {
  return (
    <div><Board rows={100} columns={100} /></div>
  );
}

export default App;
