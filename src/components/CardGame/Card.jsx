import {useState, useEffect} from 'react'
import '../../styles/Card.css'

const Card = ({name, image, setScore, shuffleCards, finishGame, stage, startGame}) => {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        if (!clicked && stage === 'inGame') {
            setClicked(true)
            setScore((prevScore) => prevScore + 1)
            shuffleCards()
        } else if (!clicked && stage === 'reset') {
            startGame()
            setClicked(true)
            setScore((prevScore) => prevScore + 1)
            shuffleCards()
        } else {
            finishGame()
        }
    }

    useEffect(() => {
        if (stage === 'reset') {
            setClicked(false)
        }
    }, [stage]);

    return (
        <div className="Card" onClick={handleClick}>
            <img src={image}
                 alt={name} />
            <div className="card-name">
                <span>{name}</span>
            </div>

        </div>
    )
}

export default Card