import { getCharacter } from 'rickmortyapi'

const totalCharacters = 671

async function getRandomChars(numberOfCharacters, totalCharacters = 671) {
    const idsRandomArray = randomNumberArray(numberOfCharacters, totalCharacters)
    const arrayOfCharacters = await getCharacter(idsRandomArray)
    console.log(arrayOfCharacters)
}

const randomNumberArray = (arrayLength, maxNumber) => {
    let randomNumberArray = []

    while (randomNumberArray.length < arrayLength) {
        let randomNumber = Math.floor((Math.random() * maxNumber) + 1)
        if (!(randomNumberArray.includes(randomNumber))) {
            randomNumberArray.push(randomNumber)
        }
    }

    return randomNumberArray
}

export default getRandomChars