import React from 'react'
import './StartScreen.css'
const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Secret World</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>COMEÇAR JOGO</button>
    </div>
  )
}

export default StartScreen