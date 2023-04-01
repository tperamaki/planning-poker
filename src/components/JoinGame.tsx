'use client';

import { useContext, useState } from 'react';
import { GameContext } from './Game';
import { joinGame } from '../network';

export default function JoinGame() {
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const { id, refreshCounter, setPlayerName } = useContext(GameContext);
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
          refreshCounter();
          joinGame(id, newPlayerName);
          setPlayerName(newPlayerName);
        }}
      >
        Join
      </button>
    </div>
  );
}
