'use client';

import { useContext, useState } from 'react';
import { GameContext } from './Game';
import { joinGame } from '../network';

export default function JoinGame() {
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const { id, refreshCounter, setPlayerName } = useContext(GameContext);
  return (
    <form
      onSubmit={() => {
        refreshCounter();
        joinGame(id, newPlayerName);
        setPlayerName(newPlayerName);
      }}
    >
      <label htmlFor="playerNameInput">Your name</label>
      <div className="flex gap-4">
        <input
          id="playerNameInput"
          className="dark:bg-neutral-500 p-2 rounded"
          onChange={(val) => {
            setNewPlayerName(val.currentTarget.value);
          }}
          required
        />
        <button className="py-2 px-5 rounded border-2 border-black dark:border-white hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-all duration-100 ease-in-out">
          Join
        </button>
      </div>
    </form>
  );
}
