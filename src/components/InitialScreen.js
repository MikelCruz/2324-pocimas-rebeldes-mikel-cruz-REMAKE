import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import axios from "axios";


function InitialScreen() {

  //Variables globales
  const {globalState, setGlobalState} = useContext(Context);


  // Variables locales 
  // const [recivedData, setRecivedData] = useState([]); 

  useEffect(() => { 
    console.log("Global State: ")
    console.log(globalState);

  }, [globalState])

  const getPotions = async () => {
    try{
      const url = "https://gist.githubusercontent.com/Oskar-Dam/ad2c96601e79ad108227bc25f90e4e53/raw/25dc0198b2aaa85f0b5583978a0c6772cab63aba/Potions.js"
      const data = await axios.get(url);
      setGlobalState(data.data)
      // setRecivedData(data.data)
  
    } catch (error) {
      console.error(error);
    }
  } 

  return (
  <div style={{width: '100%', height: '100%'}}>
    <h1> LAS POCIMAS REBELDES </h1>
    <button style={Botton} onClick={getPotions}> ENTER </button>
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


export default InitialScreen;