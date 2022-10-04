import './GameOver.css'

const GameOver = ({reStart, score}) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h2>pontuacao foi: {score}</h2>
      <button onClick={reStart}>Resetar jogo</button>
    </div>
  )
}

export default GameOver