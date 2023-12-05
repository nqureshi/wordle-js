"use client"

import { useState } from 'react';

function Form() {
  const [guess, setGuess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (guess.length !== 5) {
      setError('Input must be exactly 5 characters');
    } else {
      console.log(guess);
      setError(''); // clear the error
      // You can replace the console.log with your own logic
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl mb-4">WORDLE</h1>
      <form className="flex flex-col items-center">
        <label htmlFor="guess-input" className="mb-2">Enter guess:</label>
        <input 
          id="guess-input" 
          type="text" 
          value={guess} 
          onChange={e => setGuess(e.target.value)} 
          className="border-2 border-gray-300 rounded-md p-2 mb-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4">Submit</button>
      </form>
    </div>
  );
}

function Game() {
  return (
    <div>
      <Form />
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Game />
    </div>
  );
}