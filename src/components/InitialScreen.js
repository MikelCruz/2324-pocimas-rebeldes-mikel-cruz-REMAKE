import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import Alert from '@mui/material/Alert';

import BattleScreen from "./BattleScreen";

function InitialScreen() {

  //Variables globales
  const {potionGlobalState, setPotionGlobalState} = useContext(Context);

  // Variables locales 
  const [isInTheGame, setIsInTheGame] = useState (false) 
  const [errorInData, setErrorInData] = useState (false) 

  useEffect(() => { 
    console.log("Global State: ")
    console.log(potionGlobalState);

  }, [potionGlobalState])

  const getPotions = async () => {
    try{
      const url = "https://gist.githubusercontent.com/Oskar-Dam/ad2c96601e79ad108227bc25f90e4e53/raw/25dc0198b2aaa85f0b5583978a0c6772cab63aba/Potions.js"
      const data = await axios.get(url);
      setPotionGlobalState(data.data)
      setIsInTheGame(true)
  
    } catch (error) {
      // Booleana para mostrar el error al no cargar la operacion de getPotions
      setErrorInData(true)
      console.error(error);
    }
  } 

  return (
 
  <div style={{width: '100%', height: '100%'}}>
    {!isInTheGame && (
     <div>
       <h1> LAS POCIMAS REBELDES </h1>
       <button style={Botton} onClick={getPotions}> ENTER </button>

       {errorInData &&  (
          <Alert severity="error">No se han podido cargar los elementos. Recarga la Página o ponte en contacto con tu superior</Alert>
        )}


     </div>
    )}

    {isInTheGame && (
      <div>
        <BattleScreen />
      </div>
    )}
  </div>
  );
}

const Botton = {
  width: '200px',
  height: '80px',
  marginTop: '10%',
  alignItems: 'center',
  borderRadius: '20px',
  backgroundColor: 'rgba(138, 48, 255, 0.4)',
  fontSize: '15px'
}


export default InitialScreen;