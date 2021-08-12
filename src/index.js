import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getRandomChars from './getCardsImages'

const randomChars = getRandomChars(12)
console.log(randomChars)

ReactDOM.render(
  <React.StrictMode>
    <App characters={randomChars}/>
  </React.StrictMode>,
  document.getElementById('root')
);
