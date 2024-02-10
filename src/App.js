import './App.css';
import React, { useState } from 'react';
import InitialScreen from './components/InitialScreen';
import { Context } from './context/Context';

function App() {

  // Variables Globales
  const [potionGlobalState, setPotionGlobalState] = useState(null);

  const handleGlobalState = (data) => {
    setPotionGlobalState(potionGlobalState => ({
      ...potionGlobalState,
      ...data
    }));
  }

  return (
    <Context.Provider value={{potionGlobalState, setPotionGlobalState, handleGlobalState }}>
      <div style={styling} className="App">
        <div style={{width: '100%', height: '100%'}}>
          <InitialScreen />
        </div>
      </div>
  </Context.Provider>
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