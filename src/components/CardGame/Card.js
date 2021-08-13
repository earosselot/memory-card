import {useState} from 'react'
import '../../styles/Card.css'

const Card = (props) => {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        if (!clicked) {
            setClicked(true)
            props.setScore((prevScore) => prevScore + 1)
            props.shuffleCards()
        } else {
            props.finishGame()
        }
    }

    return (
        <div className="Card" onClick={handleClick}>
            <img src={props.image}
                 alt={props.name} />
            {props.name}
        </div>
    )
}

export default Card