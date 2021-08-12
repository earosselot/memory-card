import ScoreBoard from "./CardGame/ScoreBoard";
import HighScoreBoard from "./CardGame/HighScoreBoard";
import CardContainer from "./CardGame/CardContainer";
import {useEffect, useState} from "react";


const Main = (props) => {
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

    useEffect(() => {
        if (highScore < score) {
            setHighScore(score)
        }
    }, [score])

    const resetScore = () => {
        setScore(0)
    }

    return (
        <div>
            <ScoreBoard score={score} />
            <HighScoreBoard highScore={highScore}/>
            <CardContainer setScore={setScore} resetScore={resetScore} characters={props.characters}/>
        </div>
    )
}

export default Main