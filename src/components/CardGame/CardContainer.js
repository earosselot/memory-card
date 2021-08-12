import Card from "./Card";
import {useState} from "react";

function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5)
}

const CardContainer = (props) => {

    const [endGame, setEndGame] = useState(false)

    const finishGame = () => {
        setEndGame(true)
    }

    const resetGame = () => {
        props.resetScore()
        setEndGame(false)
    }

    console.log(props.characters)

    // props.characters = [ { name: "rick", id: 12, image: "https://asdasd" }, ...]

    // let numbers = [1,2,3,4,5,6]
    // let cardsJsxArray = numbers.map(number => <Card key={number} id={number} setScore={props.setScore} finishGame={finishGame} />)

    if (props.characters) {
        let cardsJsxArray = props.characters.map(character => <Card key={character.id} id={character.id} character={character} setScore={props.setScore} finishGame={finishGame} />)
        shuffleArray(cardsJsxArray)
    }

    return (
        <div>
            { (endGame) ? <button type="button" onClick={resetGame}>reset</button> : props.characters && <div> {cardsJsxArray} </div> }
        </div>
    )
}

export default CardContainer
