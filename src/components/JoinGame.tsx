'use client';

import { useContext, useState } from 'react';
import { GameContext } from './Game';

// TODO: Actually join the game and set the playerName
export default function JoinGame() {
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const { id, setPlayerName } = useContext(GameContext);
  return (
    <div className="flex gap-2">
      <input
        className="dark:bg-neutral-500"
        onChange={(val) => {
          setNewPlayerName(val.currentTarget.value);
        }}
      />
      <button
        className="border px-3 py-1"
        onClick={() => {
          fetch(`/api/game/${id}/${newPlayerName}`, {
            method: 'POST',
            body: JSON.stringify({}),
          });
          setPlayerName(newPlayerName);
        }}
      >
        Join
      </button>
    </div>
  );
}
