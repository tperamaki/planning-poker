'use client';

import { useContext } from 'react';
import { GameContext } from './Game';
import { vote } from '@/network';

export const VoteButton = (props: {
  value: number;
  buttonText: string;
}): JSX.Element => {
  const { id, playerName, refreshCounter, game, setGame } =
    useContext(GameContext);
  return (
    <button
      className={`border border-solid border-slate-500 rounded-xl px-10 py-20 ${
        game[playerName] === props.value ? 'bg-slate-600' : ''
      }`}
      onClick={() => {
        refreshCounter();
        setGame((game) => {
          const newGame = { ...game };
          newGame[playerName] = props.value;
          return newGame;
        });
        vote(id, playerName, props.value);
      }}
    >
      {props.buttonText}
    </button>
  );
};
