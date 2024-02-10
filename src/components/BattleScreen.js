import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import ResultScreen from "../components/ResultScreen"

// Rutas de imagenes
import curativeImage from '../assets/curative_potion.png'
import nonCurativeImage from '../assets/poison_potion.png'
import dice1 from '../assets/dice_1.png'
import dice2 from '../assets/dice_2.png'
import dice3 from '../assets/dice_3.png'
import dice4 from '../assets/dice_4.png'
import dice5 from '../assets/dice_5.png'
import dice6 from '../assets/dice_6.png'

function BattleScreen() {

  //Variables globales
  const {potionsGlobalState, setPotionsGlobalState} = useContext(Context);
  const {showResultScreen, setShowResultScreent} = useContext(Context);
  const {battleResult, setBattleResult} = useContext(Context);

  // Variables locales 
  const [selectedCurativeDice, setSelectedCurativeDice] = useState ()
  const [selectedNonCurativeDice, setSelectedNonCurativeDice] = useState ()

  const [selectedCurativePotion, setSelectedCurativePotion] = useState();
  const [selectedNonCurativePotion, setSelectedNonCurativePotion] = useState();

  // UseEffect Inicial
  useEffect(() => { 
    selectDice();
    selectedPotions();
  }, [])


  // Use Effect de informacion
  useEffect(() => { 
    // console.log("Curative Dice:")
    // console.log(selectedCurativeDice)

    // console.log("Curative Potion");
    // console.log(selectedCurativePotion);

    // console.log("Show Result Screen? " + showResultScreen)

    console.log("Battle Result")
    console.log(battleResult)

  }, [selectedCurativePotion, selectedCurativeDice, 
      showResultScreen, battleResult])
 

  // Funcion que escoge un dado aleatorio
  const selectDice = async () => {
    const dices = [dice1, dice2, dice3, dice4, dice5, dice6]

    setSelectedCurativeDice( generateRandomDice(dices) );
    setSelectedNonCurativeDice( generateRandomDice(dices) );

  }

  // Funcion que Genera un dado Aleatorio con el array de dados pasado
  const generateRandomDice = (dices) => {
    const randomNumber = Math.floor(Math.random() * 6);
    return {
      dice: dices[randomNumber],
      value: randomNumber + 1, // Hacemos +1 ya que el array cuenta desde 0, pero el valor es 1 en la posicion 0
    };
  };
  

  // Funcion que escoge las pociones para la batalla
  const selectedPotions = () => {

    // Filtrado de pociones curativas
    const curativePotionsArray = potionsGlobalState.filter((element) => element.curative === true);
  
    // Filtrado de pociones no curativas
    const nonCurativePotionsArray = potionsGlobalState.filter((element) => element.curative === false);
  
    // Seleccionar aleatoriamente una poción curativa y no curativa
    setSelectedCurativePotion( curativePotionsArray[Math.floor(Math.random() * curativePotionsArray.length)] );
    setSelectedNonCurativePotion ( nonCurativePotionsArray[Math.floor(Math.random() * nonCurativePotionsArray.length)]) ;
  
  };

  // Funcion que calculara la pocion ganadora y la perdedora
  const handleBattle = () => {
    const curativePenalization = selectedCurativeDice.value * 0.1
    const nonCurativePenalization = selectedNonCurativeDice.value * 0.1

    // El calculo estará en formato string por lo que tendre que utilizar parseFLoat
    const curativeResult = ((curativePenalization * selectedCurativePotion.power) / selectedCurativePotion.mana).toFixed(2);
    const nonCurativeResult = ((nonCurativePenalization * selectedNonCurativePotion.power) / selectedCurativePotion.mana).toFixed(2);

    const ResultData = [];

    if (parseFloat(curativeResult) > parseFloat(nonCurativeResult)) {

      const winner = { win: true, potion: selectedCurativePotion, dice: selectedCurativeDice }
      const looser = { win: false, potion: selectedNonCurativePotion, dice: selectedNonCurativeDice }
      ResultData.push(winner, looser)

    } else if (parseFloat(curativeResult) < parseFloat(nonCurativeResult)) {

      const winner = { win: true, potion: selectedNonCurativePotion, dice: selectedNonCurativeDice }
      const looser = { win: false, potion: selectedCurativePotion, dice: selectedCurativeDice }

      ResultData.push(winner, looser)

    } else {
      console.log("Los resultados son iguales.");
    }

    setBattleResult(ResultData);
    setShowResultScreent(true);
  }

  // Devuelve null si no se ha cargado los datos correspondientes
  if(selectedCurativeDice === null || selectedCurativeDice === undefined  )
    return null;


  return (

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {!showResultScreen &&  (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Resultados Intermedios</h1>
    
      <div style={ mainContainer }>

        {/* Bloque de Poción Curativa */}
        <div style={{ width: '45%'}}>
          <img src={curativeImage} alt="curativePotion" style={PotionImageStyle} />
          <img src={selectedCurativeDice.dice} alt="curativeDice" style={DiceImageStyle} />

          <div style={{ border: '4px solid', padding: '10px' }}>
            <h2>Name: {selectedCurativePotion.name}</h2>
            <h2>Alias: {selectedCurativePotion.alias}</h2>
            <h2>Curative: {selectedCurativePotion.curative.toString()}</h2>
            <h2>Power: {selectedCurativePotion.power}</h2>
            <h2>Mana: {selectedCurativePotion.mana}</h2>
          </div>
        </div>

        {/* Bloque de Poción No Curativa */}
        <div style={{ width: '45%' }}>
          <img src={nonCurativeImage} alt="nonCurativePotion" style={PotionImageStyle} />
          <img src={selectedNonCurativeDice.dice} alt="nonCurativeDice" style={DiceImageStyle} />

          <div style={{ border: '4px solid', padding: '10px' }}>
            <h2>Name: {selectedNonCurativePotion.name}</h2>
            <h2>Alias: {selectedNonCurativePotion.alias}</h2>
            <h2>Curative: {selectedNonCurativePotion.curative.toString()}</h2>
            <h2>Power: {selectedNonCurativePotion.power}</h2>
            <h2>Mana: {selectedNonCurativePotion.mana}</h2>
          </div>
        </div>
      </div>
    
    
  {/* Botón de Lanzar Batalla */}
  <button style={BottonStyle} onClick={handleBattle}>LAUNCH BATTLE</button>
  </div>
  )}
  
  {showResultScreen &&  (
    <ResultScreen />   
  )}
</div>
  );
}

const BottonStyle = {
  width: '500px',
  height: '100px',
  marginTop: '5%',
  alignItems: 'center',
  borderRadius: '3px',
  borderColor: 'rgba(1, 130, 214, 1)',
  backgroundColor: 'rgba(7, 157, 255, 0.4)',
}

const DiceImageStyle = {
  width: '50px',
  height: '50px',
}

const PotionImageStyle = {
  width: '100px',
  height: '100px',
}

const mainContainer = {
  display: 'flex', 
  justifyContent: 'space-between', 
  width: '80%', 
  marginBottom: '20px'
}


export default BattleScreen;