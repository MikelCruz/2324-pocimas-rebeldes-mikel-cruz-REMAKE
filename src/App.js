import './App.css';
import React from "react";
import InitialScreen from './components/InitialScreen';

function App() {
  return (
  <div style={styling} className="App">
    <div style={{width: '100%', height: '100%'}}>
      <InitialScreen />
    </div>
  </div>
  );
}


const styling = {
  justifyContent: "center", 
  alignItems: "center", 
  display: "flex", 
  width: '100%', 
  height: '40vw'
}

export default App;