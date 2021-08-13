import ScoreBoard from "./CardGame/ScoreBoard";
import HighScoreBoard from "./CardGame/HighScoreBoard";
import CardContainer from "./CardGame/CardContainer";
import {useEffect, useState} from "react";
import {getCharacter} from "rickmortyapi";
import {randomNumberArray, extractCharacterData} from "../auxiliar"


const Main = () => {
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

    const randomCharIds = randomNumberArray(15, 671)
    //necesito un state card number que cuando cambia pide de nuevo personajes aleatorios
    const [data, loading, error] = usePromise(() => getCharacter(randomCharIds))

    useEffect(() => {
        if (highScore < score) {
            setHighScore(score)
        }
    }, [score])

    const resetScore = () => {
        setScore(0)
    }

    if (loading) return <div>Loading...</div>

    if (error) return <div>An error occurred...</div>
    return (
        <div>
            <ScoreBoard score={score} />
            <HighScoreBoard highScore={highScore}/>
            <CardContainer
                setScore={setScore}
                resetScore={resetScore}
                loading={loading}
                charactersData={extractCharacterData(data)}
                />
        </div>
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