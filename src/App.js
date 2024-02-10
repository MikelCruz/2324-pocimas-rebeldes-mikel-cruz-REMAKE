import './App.css';
import React, { useState } from 'react';
import InitialScreen from './components/InitialScreen';
import { Context } from './context/Context';

function App() {

  // Variables Globales
  const [potionsGlobalState, setPotionsGlobalState] = useState(null);
  const [showResultScreen, setShowResultScreent] = useState(false);
  const [battleResult, setBattleResult] = useState(null);
  const [randomPotionNumber, setRandomPotionNumber] = useState(0);

  const handleGlobalState = (data) => {
    setPotionsGlobalState(potionsGlobalState => ({
      ...potionsGlobalState,
      ...data
    }));
  }

  return (
    <Context.Provider value={{
      potionsGlobalState, setPotionsGlobalState, handleGlobalState, 
      showResultScreen, setShowResultScreent,
      battleResult, setBattleResult,
      randomPotionNumber, setRandomPotionNumber
    }}>
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