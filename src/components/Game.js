import './Game.css'
import { useState, useRef } from 'react'
const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, score, wrongLetters, guesses}) => {
  //o que ocorre depois que o jogador tenta uma letra
  const handleSubmit = (event) => {
    event.preventDefault()
    verifyLetter(letter)
    setLetter("")
    letterInputRef.current.focus()
  }
  const [letter, setLetter] = useState("")
  const letterInputRef  = useRef(null)
  return (
    <div className="game">
        <p className="points">
          <span>pontuação: {score}</span>
        </p>
        <h1>Advinhe a palavra</h1>
        <h3 className='tip'>
          Dica da Palavra: 
          <span> {pickedCategory}</span>
        </h3>
        <p>Voce ainda tem {guesses} tentativas</p>
        <div className="wordConteiner">
          {
            letters.map((letter, indice)=>(
              guessedLetters.includes(letter) ? (<span key={indice} className="letter"> {letter}</span>) : (<span key={indice} className="blackSquare"></span>)
            ))
          }
        </div>
        <div className="letterConteiner">
          <p>Tente adivinhar uma letra da palavra</p>
          {/*formulario para pegar a letra adivinhada pelo jogador*/}
          <form onSubmit={handleSubmit}>
            <input type="text"  name='letter' maxLength={1} required onChange={(event)=> setLetter(event.target.value)} value={letter} ref={letterInputRef}/>
            <button>Jogar</button>
          </form>
        </div>
        <div className="wrongLetterConteiner">
          <p>letras já utilizadas:</p>
          {wrongLetters.map((letter, indice)=> (
            <span key={indice}>{letter}, </span>
          ))}
        </div>
    </div>
  )
}

export default Game