'use client';

import { useContext } from 'react';
import { GameContext } from './Game';
import { vote } from '@/network';

export const VoteButton = (props: {
  value: number;
  buttonText: string;
}): JSX.Element => {
  const { id, playerName, refreshCounter } = useContext(GameContext);
  return (
    <button
      className="border border-solid border-slate-500 rounded-xl px-10 py-20"
      onClick={() => {
        refreshCounter();
        vote(id, playerName, props.value);
      }}
    >
      {props.buttonText}
    </button>
  );
};
