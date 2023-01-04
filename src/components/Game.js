import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score
}) => {
  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)
  const handleSubmit = (e) =>{
    e.preventDefault()
    verifyLetter(letter)
    setLetter("")
    letterInputRef.current.focus()
  }
  return (
    <div className="game">
      <p className="points">Pontuação: <span>{score}</span></p>
      <h3 className="tip">Dica: <span>{pickedCategory}</span></h3>
      <p className="attempts">tentativas restantes: <span>{guesses}</span></p>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <p key={i} className="letter">{letter}</p>
          ) : (
            <div key={i} className="blanckSquare"></div>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Digite uma letra</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name='letter' 
            maxLength="1" 
            required 
            onChange={(e) => setLetter(e.target.value)} 
            value={letter}
            ref={letterInputRef}
            />
          <button>Testar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras testadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter} </span>
        ))}
      </div>
    </div >
  )
}

export default Game