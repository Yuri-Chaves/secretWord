// css
import './App.css';
// hooks
import { useCallback, useEffect, useState } from 'react'
// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import End from './components/End';
// data
import { wordsList } from './data/words';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

const numOfGuesses = 5

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGesses] = useState(numOfGuesses)
  const [score, setScore] = useState(0)

  // Obtendo uma palavra
  const pickedWordAndCategory = useCallback(() => {
    // pegando uma categoria aleatória
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    // pegando uma palavra aleatória da categoria selecionada
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  },[words])
  // resetando os states
  const clearLetterStates = () => {
    setGessedLetters([])
    setWrongLetters([])
  }
  // start game
  const startGame = useCallback(() => {
    clearLetterStates()
    const { word, category } = pickedWordAndCategory()
    // quebrando a palavra
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    // setando os states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    setGameStage(stages[1].name)
  }, [pickedWordAndCategory])
  // verificar a letra digitada
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()
    // verificando se a letra já foi usada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }
    // pegar a letra certa ou remover uma chance
    if (letters.includes(normalizedLetter)) {
      setGessedLetters((actualGessedLetter) => [
        ...actualGessedLetter,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetter) => [
        ...actualWrongLetter,
        normalizedLetter
      ])
      // diminuindo as tentativas restantes
      setGesses((actualGesses) => actualGesses - 1)
    }
  }
  // verificando condição de vitória
  useEffect(() =>{
    const uniqueLetters = [ ...new Set(letters)]
    // condição de vitória
    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore += 100)
      // chamando nova palavra
      startGame()
    }

  }, [guessedLetters, letters, startGame])
  // controlando o número de tentativas
  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])
  // fim de jogo
  const retry = () => {
    setScore(0)
    setGesses(numOfGuesses)
    setGameStage(stages[0].name)
  }



  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <End retry={retry} score={score} />}
    </div>
  );
}

export default App;
