import './End.css'

const End = ({ retry, score }) => {
  return (
    <div>
      <h1 className="gameOver">Game Over</h1>
      <h2>Pontuação: <span>{score}</span></h2>
      <button onClick={ retry }>Resetar Jogo</button>
    </div>
  )
}

export default End