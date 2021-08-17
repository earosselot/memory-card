import ScoreBoard from "./CardGame/ScoreBoard";
import HighScoreBoard from "./CardGame/HighScoreBoard";
import CardContainer from "./CardGame/CardContainer";
import {useEffect, useState} from "react";
import {getCharacter} from "rickmortyapi";
import {randomNumberArray, extractCharacterData, shuffleArray} from "../auxiliar"
import Card from "./CardGame/Card";
import '../styles/Main.css'


const Main = () => {
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

    const randomCharIds = randomNumberArray(18, 671)
    //necesito un state card number que cuando cambia pide de nuevo personajes aleatorios
    const [characters, loading, error] = usePromise(() => getCharacter(randomCharIds))

    const [stage, setStage] = useState('inGame')

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
    }

    const startGame = () => {
        setStage('inGame')
    }

    const shuffleCards = () => {
        shuffleArray(cardsJsxArray)
    }

    if (loading) return <section>Loading...</section>

    if (error) return <section>An error occurred...</section>

    let cardsJsxArray

    if (!loading) {
        cardsJsxArray = extractCharacterData(characters).map(character =>
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
            />)
        shuffleArray(cardsJsxArray)
    }

    return (
        <section className="Main">
            <header>
                <ScoreBoard score={score} />
                <HighScoreBoard highScore={highScore}/>
            </header>
            <CardContainer>{cardsJsxArray}</CardContainer>
        </section>
    )
}


const usePromise = (task) => {
    const [state, setState] = useState([null, true, null]);

    useEffect(() => {
        task()
            .then(result => setState([result, false, null]))
            .catch(error => setState([null, false, error]))
    }, []) // << omit the condition here, functions don't equal each other²

    return state
}


export default Main