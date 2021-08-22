import ScoreBoard from "./CardGame/ScoreBoard";
import HighScoreBoard from "./CardGame/HighScoreBoard";
import CardContainer from "./CardGame/CardContainer";
import {useEffect, useState} from "react";
import {randomNumberArray, shuffleArray} from "../auxiliar"
import Card from "./CardGame/Card";
import '../styles/Main.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => (
    {
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
);


const Difficulties = [
    {
        value: 6,
        name: 'Jerry (6)'
    },
    {
        value: 10,
        name: 'Morty (10)'
    },
    {
        value: 16,
        name: 'Rick (16)'
    },
    {
        value: 20,
        name: 'WubbaLubbaDubDub'
    },
]

const Main = () => {
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [charsNumber, setCharsNumber] = useState(6);
    const [characters, setCharacters] = useState([])
    const [stage, setStage] = useState('inGame')

    useEffect(() => {
        getCharacters()
    }, [charsNumber]);

    async function getCharacters() {
        const charactersNumberArray = randomNumberArray(charsNumber, 671)
        const response =
          await fetch(`https://rickandmortyapi.com/api/character/${charactersNumberArray.join(',')}`)
        const data = await response.json()
        const newCharacters = data.map( character => {
            return {
                id: character.id,
                name: character.name,
                image: character.image,
            }
        })
        setCharacters(newCharacters)
    }

    function handleDificultyChange(event) {
        setCharsNumber(event.target.value)
    }

    useEffect(() => {
        if (highScore < score) {
            setHighScore(score)
        }
        if (score === charsNumber) {
            console.log('end')
            setStage('gameEnded')
        }
    }, [score])

    useEffect(() => {
        if (stage === 'gameEnded') {
            setScore(0)
            setStage('reset')
            setCharacters([])
            getCharacters()
        }
    }, [stage])

    const finishGame = () => {
        setStage('gameEnded')
    }

    const startGame = () => {
        setStage('inGame')
    }

    const shuffleCards = () => {
        const newCharacters = shuffleArray(characters)
        setCharacters(newCharacters)
    }

    function getNewCards() {
        getCharacters()
        finishGame()
    }

    return (
        <section className="Main">
            <header>
                <ScoreBoard score={score} />
                <HighScoreBoard highScore={highScore}/>
                <form className="difficulty-form">
                    <label
                      htmlFor="difficulty-select"
                      className="difficulty-label">
                        Dificulty
                    </label>
                    <select
                      id="difficulty-select"
                      className="difficulty-select"
                      value={charsNumber}
                      onChange={handleDificultyChange}
                    >
                        {Difficulties.map(difficulty =>
                          <option value={difficulty.value} key={difficulty.value}>
                              {difficulty.name}
                          </option>
                        )}
                    </select>
                </form>
            </header>

            <CardContainer>
                {characters?.map(character => (
                  <Card
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    image={character.image}
                    setScore={setScore}
                    startGame={startGame}
                    finishGame={finishGame}
                    shuffleCards={shuffleCards}
                    stage={stage}
                  />
                ))}
            </CardContainer>

            <Button onClick={getNewCards} variant="contained" color="primary">
                Change Cards
            </Button>
        </section>
    )
}

export default Main
