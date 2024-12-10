import './App.css';
import { Grid } from './components/Grid/Grid';
import { useState } from 'react';
import { Settings } from './components/Settings/Settings';

function App() {  
  return (
    <div className="App">
      <h1> Roomba </h1>
      <Settings />
      <Grid />
    </div>
  );
}

export default App;
