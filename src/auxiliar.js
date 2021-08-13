
export const randomNumberArray = (arrayLength, maxNumber) => {
    let randomNumberArray = []

    while (randomNumberArray.length < arrayLength) {
        let randomNumber = Math.floor((Math.random() * maxNumber) + 1)
        if (!(randomNumberArray.includes(randomNumber))) {
            randomNumberArray.push(randomNumber)
        }
    }
    return randomNumberArray
}

export const extractCharacterData = (charactersData) => {
    let clearedCharactersData = []
    charactersData.forEach(character => {
        clearedCharactersData.push(extractCharData(character, "id", "name", "image"))
    })
    return clearedCharactersData
}

const extractCharData = (character, ...keys) => {
    const newObject = {}
    Object.keys(character).forEach(key => {
        if (keys.includes(key)) {
            newObject[key] = character[key]
        }
    })
    return newObject
}

export const shuffleArray = (arr) => {
    arr.sort(() => Math.random() - 0.5)
    return arr
}