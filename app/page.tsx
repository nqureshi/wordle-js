"use client"

import { NUM_OF_GUESSES_ALLOWED } from './utils/constants';
import { range, sample } from './utils/utils';
import { checkGuess } from './utils/game-helpers';
import { useState } from 'react';

function Form({ handleSubmit }) {

  const [guess, setGuess] = useState('');
  const [error, setError] = useState('');

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault(); // needed to stop the whole page from refreshing on Submit
    if (guess.length === 5) {
      handleSubmit(guess);
      setGuess('')
      setError('')
    } else {
      setError('Input must be 5 characters')
    };
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
      arr.push("     ")
    }
  }

  console.log(checkGuess(arr[0], 'WHALE'));

  return (
    <div className="guess-results p-4">
      {arr.map((guess, index) => (
        <p className="guess" key={index}>
          {guess.split('').map((letter, index) =>
            <span key={index} className="cell">
              {letter}
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
        <Form handleSubmit={handleSubmit} />
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