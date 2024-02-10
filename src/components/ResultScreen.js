import React from 'react';

function ResultScreen() {

  return (
  <div style={styling} className="App">
    <div style={{width: '100%', height: '100%'}}>
      <h1> RESULT SCREEN</h1>
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

export default ResultScreen;