import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";

import curativeImage from '../assets/curative_potion.png'
import nonCurativeImage from '../assets/poison_potion.png'

function ResultScreen() {

  // Variables globales
  const {potionsGlobalState } = useContext(Context);
  const {showResultScreen, setShowResultScreent} = useContext(Context);
  const {battleResult } = useContext(Context);
  const {setRandomPotionNumber} = useContext(Context);

  // Variables locales
  const [winnerPotion, setWinnerPotion] = useState(null)
  const [looserPotion, setLooserPotion] = useState(null)

  // UseState de informacion
  useEffect(() => { 
    console.log("Winner Potion:")
    console.log(winnerPotion)

    console.log("Looser Potion:")
    console.log(looserPotion)
  }, [winnerPotion, looserPotion])


  // UseState inicial para seleccionar colocar las pociones tanto ganadoras como perdedoras.
  useEffect(() => { 
    handleBattleResult()
  }, [])


  const handleBattleResult = () => {
    const winner = battleResult.filter(result => result.win === true)
    const looser = battleResult.filter(result => result.win === false)

    setWinnerPotion(winner[0])
    setLooserPotion(looser[0])

  }

  const handleRelaunchBattle = () => {
    console.log("Relaunch the battle")
    setRandomPotionNumber(Math.floor(Math.random() * (potionsGlobalState.length/2)))
    setShowResultScreent(false) // Reinicio la batalla
  }

  if( winnerPotion === null || winnerPotion === undefined ||
      looserPotion === null || looserPotion === undefined 
    )
  return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {showResultScreen && ( 
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Resultados Finales</h1>

        <div style={mainContainer}>
          {/* Bloque de Ganador */}
          <div style={blockStyle}>
            <div style={innerBlockStyle}>
              <h2>WINNER POTION <img src={curativeImage} alt="curativePotion" style={ImageStyle} /></h2>
              <h2>DICE RESULT <img src={winnerPotion.dice.dice} alt="curativeDice" style={ImageStyle} /></h2>
              <h2 style={{ color: 'red' }}>{winnerPotion.dice.value} x 0.1 = {winnerPotion.dice.penalization.toFixed(2)}</h2>
              <h2>TOTAL SCORE </h2>
              <h2>{winnerPotion.dice.penalization.toFixed(2)}x {winnerPotion.potion.power} / {winnerPotion.potion.mana} = {winnerPotion.result}</h2>
            </div>
          </div>

          {/* Bloque de Perdedor */}
          <div style={blockStyle}>
            <div style={innerBlockStyle}>
              <h2>LOOSER POTION <img src={nonCurativeImage} alt="nonCurativePotion" style={ImageStyle} /></h2>
              <h2>DICE RESULT <img src={looserPotion.dice.dice} alt="nonCurativeDice" style={ImageStyle} /></h2>
              <h2 style={{ color: 'red' }}>{looserPotion.dice.value} x 0.1 = {looserPotion.dice.penalization.toFixed(2)}</h2>
              <h2>TOTAL SCORE </h2>
              <h2>{looserPotion.dice.penalization.toFixed(2)}x {looserPotion.potion.power} / {looserPotion.potion.mana} = {looserPotion.result}</h2>
            </div>
          </div>
        </div>

        {/* Botón de Re Lanzar Batalla */}
        <button style={BottonStyle} onClick={handleRelaunchBattle}>RELAUNCH BATTLE</button>
      </div>
      )}
    </div>
  );
};

const ImageStyle = {
  width: '50px',
  height: '50px',
};

const mainContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '80%',
  marginBottom: '20px',
};

const blockStyle = {
  width: '48%', // Ajusta según sea necesario
  padding: '10px',
  boxSizing: 'border-box',
};

const innerBlockStyle = {
  border: '4px solid',
  padding: '10px',
};

const BottonStyle = {
  width: '500px',
  height: '100px',
  marginTop: '5%',
  alignItems: 'center',
  borderRadius: '3px',
  borderColor: 'rgba(1, 130, 214, 1)',
  backgroundColor: 'rgba(7, 157, 255, 0.4)',
};

export default ResultScreen;