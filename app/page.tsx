"use client"

import { useState } from 'react';

function Form({
    error, setError, guesses, setGuesses, handleSubmit
  }: 
  {
    error: string; 
    setError: React.Dispatch<React.SetStateAction<string>>;  
    guesses: string[]; 
    setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
    handleSubmit: () => void;
  }) {
  
  const [guess, setGuess] = useState('');

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault(); // needed to stop the whole page from refreshing on Submit
    handleSubmit(guess);
    setGuess('');
  };  

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl mb-4">WORDLE</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmitForm}>
        <label htmlFor="guess-input" className="mb-2">Enter guess:</label>
        <input 
          id="guess-input" 
          type="text" 
          value={guess} // Use localGuess for the input value
          onChange={e => setGuess(e.target.value)} // Update localGuess on change
          className="border-2 border-gray-300 rounded-md p-2 mb-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <input type="submit" value="Submit" className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4" />
      </form>
    </div>
  );
}

function RenderGuesses({ guesses }: { guesses: string[] }) {
  return (
    <div className="mt-8"> {/* Margin top to separate from the form */}
      <ul className="p-4"> {/* Padding, background color, rounded corners, and shadow */}
        {guesses.map((guess, index) => (
          <li key={index} className=""> {/* Padding and border for each item */}
            {guess}
          </li>
        ))}
      </ul>
    </div>
  );
}


function Game() {
  const [error, setError] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  
  const handleSubmit = (guess: string) => {
    if (guess.length !== 5) {
      setError('Input must be exactly 5 characters');
    } else {
      console.log(guess.toUpperCase());
      setGuesses([...guesses, guess.toUpperCase()]);
      setError('');
    }
  };

  return (
    <>
      <div>
        <Form error={error} setError={setError} guesses={guesses} setGuesses={setGuesses} handleSubmit={handleSubmit} />
      </div>
      <div>
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