import {useState} from "react";

const Card = (props) => {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        if (!clicked) {
            setClicked(true)
            props.setScore((prevScore) => prevScore + 1)
        } else {
            props.finishGame()
        }
    }

    return (
        <div onClick={handleClick}>
            Card {props.id}
        </div>
    )
}

export default Card