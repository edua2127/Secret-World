import './GameOver.css'

const GameOver = ({reStart}) => {
  return (
    <div>
      <h1>GameOver</h1>
      <button onClick={reStart}>RECOMEÇAR JOGO</button>
    </div>
  )
}

export default GameOver