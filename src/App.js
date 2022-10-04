
//CSS
import './App.css';

//COMPONENTES
import StartScreen from './components/StartScreen';


//REACT
import {useEffect, useState, useCallback } from 'react'

//DATA
import {wordsList} from './data/words'
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")

  const [pickedCategory, setPickedCategory] = useState("")

  const [letter, setLatter] = useState([])


  //variaveis usadas no jogo
  //letras adivinhadas
  const[guessedLetters, setGuessedLetters] = useState([])
  //letras adivinhadas erradas
  const[wrongLetters, setWrongLetters] = useState([])
  //numero de tentativas do jogador
  const[guesses, setGuesses] = useState(3)
  //score do jogodor
  const[score, setScore] = useState(0)

  //quantidade de tentativas
  const guessesQty = 3
  const pickWordAndCategory = useCallback(() =>{
    //gera uma lista com as keys/atributos do objeto words
    const listaCategoria = Object.keys(words)

    //seleciona de maneira aleatorio uma categoria da lista de categoria
    //math.floor -> arredonta para baixo
    const categoria = listaCategoria[Math.floor(Math.random() * listaCategoria.length)]

    //seleciona uma palavra da categoria selecionada
    //obs: é possivel acessar a key de um objeto usando ['nome da key']
    //para gerar um numero aleatorio de 0 a algum valor: Math.random() * valorLimite
    const word = words[categoria][Math.floor(Math.random() * words[categoria].length)]

    return {categoria, word}
  }, [words])

  //inicia o jogo quando clica em começar
  const startGame = useCallback(() => {
    //limpa os states do jogo anterior
    clearLetterStates()

    //escolhe a categoria e a palavra
    const {categoria, word} = pickWordAndCategory()
    
    //gera uma lista de letras com base na palavra selecionada
    let listaLetras = word.split("")
    
    //transforma todas as letras em minuscula
    listaLetras = listaLetras.map((letra)=> letra.toLowerCase())
    
    //seta os estados
    setPickedCategory(categoria)
    setLatter(listaLetras)
    setPickedWord(word)

    
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])


  //verifica a letra do input, se é valida ou invalida
  const verifyLetter = (letterInput)=> {
    //normalizacao do input
    const normalizedLetter = letterInput.toLowerCase()

    //verificacao se ela ja foi utilizada, seja certa ou errada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    //adiciona a letra nas letras corretas ou remove uma chande do jogador
    //obs: adiciona a letra na lista de letras acertadas != das letras geradas 
    if(letter.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetter)=> [...actualGuessedLetter, normalizedLetter])
    } else {
      setWrongLetters((actualWrongLetters)=> [...actualWrongLetters, normalizedLetter])
      setGuesses((actualGuesses)=> actualGuesses - 1)
    }
   
  }
  
  const clearLetterStates = ()=> {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //monitora o numero de chances, verificando se é menor ou igual a 0
  //reseta parte dos dados
  useEffect(()=> {
    if (guesses <= 0) {
      //reseta todos os states
      clearLetterStates()

      //para para a tela de game over
      setGameStage(stages[2].name)
    }

  }, [guesses])

  //verifica a condicao de vitoria
  useEffect(()=> {
    //new set me devolve um array com letras unicas
    const uniqueLetters = [...new Set(letter)]
    
    //win condition
    if(guessedLetters.length === uniqueLetters.length) {
      //add score
      setScore((actualScore)=> actualScore += 100)

      //restart do jogo
      startGame()
    }
  }, [guessedLetters, letter, startGame])
  //reinicia o jogo
  //reseta a pontuacao do jogo
  const reiniciaGame = ()=> {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }
  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory} 
      letters={letter}
      guessedLetters={guessedLetters}
      score={score}
      wrongLetters={wrongLetters}
      guesses={guesses}
      />}
      {gameStage === 'end' && <GameOver reStart={reiniciaGame} score={score}/>}
    </div>
  );
}

export default App;
