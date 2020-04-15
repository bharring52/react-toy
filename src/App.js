import React from 'react';
import './App.css';
import { Board } from './components/board/board.js';

function App() {
  return (
    <div><Board rows={5} columns={10} />This should render</div>
  );
}

export default App;
