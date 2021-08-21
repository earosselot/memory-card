import ScoreBoard from "./CardGame/ScoreBoard";
import HighScoreBoard from "./CardGame/HighScoreBoard";
import CardContainer from "./CardGame/CardContainer";
import {useEffect, useState} from "react";
import {randomNumberArray, shuffleArray} from "../auxiliar"
import { shuffle } from 'lodash'
import Card from "./CardGame/Card";
import '../styles/Main.css'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FlipMove from "react-flip-move";


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
        name: 'Jerry(6)'
    },
    {
        value: 10,
        name: 'Morty(10)'
    },
    {
        value: 16,
        name: 'Rick(16)'
    },
    {
        value: 20,
        name: 'WubbaLubbaDubDub'
    },
]

const Main = () => {
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [charsNumber, setCharsNumber] = useState(10);
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [stage, setStage] = useState('inGame')
    const classes = useStyles();

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
        setLoading(false)
    }

    function handleDificultyChange(event) {
        setCharsNumber(event.target.value)
    }

    useEffect(() => {
        if (highScore < score) {
            setHighScore(score)
        }
    }, [score])

    useEffect(() => {
        if (stage === 'gameEnded') {
            setScore(0)
            setStage('reset')
        }
    }, [stage])

    const finishGame = () => {
        setStage('gameEnded')
        shuffleCards()
    }

    const startGame = () => {
        setStage('inGame')
    }

    const shuffleCards = () => {
        const newCharacters = shuffleArray(characters)
        setCharacters(newCharacters)
    }

    return (
        <section className="Main">
            <header>
                <ScoreBoard score={score} />
                <HighScoreBoard highScore={highScore}/>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                      id="demo-simple-select-outlined-label">
                        Dificulty
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={charsNumber}
                      onChange={handleDificultyChange}
                    >
                        {Difficulties.map(difficulty =>
                          <MenuItem value={difficulty.value}>
                              {difficulty.name}
                          </MenuItem>
                        )}
                    </Select>
                </FormControl>
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

            <Button onClick={getCharacters} variant="contained" color="primary">
                Change Cards
            </Button>
        </section>
    )
}

export default Main

