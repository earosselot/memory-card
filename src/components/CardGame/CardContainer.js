import Card from './Card'
import { useState } from 'react'
import { shuffleArray } from '../../auxiliar'
import '../../styles/CardContainer.css'

const CardContainer = ({ setScore, resetScore, loading, charactersData }) => {
    const [endGame, setEndGame] = useState(false)
    const [characters, setCharacters] = useState(shuffleArray(charactersData))

    const finishGame = () => {
        setEndGame(true)
    }

    const resetGame = () => {
        resetScore()
        setEndGame(false)
        shuffleCards()
    }

    const shuffleCards = () => {
        setCharacters((prevNumbers) => shuffleArray(prevNumbers))
    }

    let cardsJsxArray = characters.map(character =>
        <Card
            key={character.id}
            id={character.id}
            name={character.name}
            image={character.image}
            setScore={setScore}
            finishGame={finishGame}
            shuffleCards={shuffleCards}/>)

    return (
        <div >
            { (endGame) ?
                <button type="button" onClick={resetGame}>reset</button> :
                <div className="Card-container"> {cardsJsxArray} </div> }
        </div>
    )
}

export default CardContainer
