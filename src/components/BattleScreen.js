import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";



function BattleScreen() {

  //Variables globales
  const {potionGlobalState, setPotionGlobalState} = useContext(Context);


  // Variables locales 
  // const [recivedData, setRecivedData] = useState([]); 

  useEffect(() => { 

  }, [])

  const handleBattle = () => {
    console.log("Handle battle button pressed")
  }
  return (
  <div style={{width: '100%', height: '100%'}}>
    <h1> BATTLE SCREEN </h1>
    <button style={Botton} onClick={handleBattle}> LAUNCH BATTLE </button>
  </div>
  );
}

const Botton = {
  width: '10%',
  height: '10%',
  marginTop: '10%',
  alignItems: 'center',
  borderRadius: '100px',
  backgroundColor: 'rgba(138, 48, 255, 0.4)',
}


export default BattleScreen;