"use client"

import { NUM_OF_GUESSES_ALLOWED } from './utils/constants';
import { range, sample } from './utils/utils';
import { checkGuess } from './utils/game-helpers';
import { WORDS } from './utils/data';
import { useState, useEffect } from 'react';

let ANSWER = sample(WORDS);
console.log(ANSWER);

function Form({ handleSubmit, guesses }: { handleSubmit: () => void; guesses: string[] }) {

  const [guess, setGuess] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault(); // needed to stop the whole page from refreshing on Submit

    // length validation check
    if (guess.length !== 5) {
      setError('Input must be 5 characters');
      return;
    }

    // check if Win, or Loss
    if (guess.toUpperCase() === ANSWER) {
      setIsDisabled(true); // Disable text input
      console.log("You won!");
      console.log(guesses);
    } else if (guesses.length > NUM_OF_GUESSES_ALLOWED - 2) {
      setIsDisabled(true);
      console.log("You lost!");
    }

    // if guess is valid length + neither win nor loss...
    handleSubmit(guess);
    setGuess('');
    setError('');

  };

  return (
    <div>
      <form className="flex flex-col items-center" onSubmit={handleSubmitForm}>
        <label htmlFor="guess-input" className="mb-2">Enter guess:</label>
        <input
          id="guess-input"
          type="text"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 mb-2"
          disabled={isDisabled}
        />
        {error && <p className="text-red-500">{error}</p>}
        <input type="submit" value="Submit" className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4" />
      </form>
    </div>
  );
}

function RenderGuesses({ guesses }: { guesses: string[] }) {
  const arr = []

  for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
    if (guesses[i]) {
      arr.push(guesses[i])
    } else {
      arr.push("     ") // 6 empty chars for six boxes
    }
  }

  return (
    <div className="guess-results p-4">
      {arr.map((guess, index) => (
        <p className="guess" key={index}>
          {checkGuess(guess, ANSWER).map((item, letterIndex) =>
            <span key={letterIndex} className={`cell ${item.letter === ' ' ? '' : item.status}`}>
              {item.letter}
            </span>
          )}
        </p>
      ))}
    </div>
  );
}

function Game() {
  const [guesses, setGuesses] = useState<string[]>([]);

  const handleSubmit = (guess: string) => {
    console.log(guess.toUpperCase());
    setGuesses([...guesses, guess.toUpperCase()]);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white p-24">
        <h1 className="text-4xl mb-4">WORDLE</h1>
        <Form handleSubmit={handleSubmit} guesses={guesses} />
        <div className="flex flex-col items-center justify-center bg-white p-4">
        </div>
        <h2>So far, you've guessed...</h2>
        <RenderGuesses guesses={guesses} />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div>
      <Game />
    </div>
  );
}