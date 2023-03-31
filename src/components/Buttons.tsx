'use client';

import { useContext } from 'react';
import { GameContext } from './Game';

export const VoteButton = (props: {
  value: number;
  buttonText: string;
}): JSX.Element => {
  const { id, playerName } = useContext(GameContext);
  return (
    <button
      className="border border-solid border-slate-500 rounded-xl px-10 py-20"
      onClick={() =>
        fetch(`/api/game/${id}/${playerName}`, {
          method: 'PUT',
          body: JSON.stringify({ value: props.value }),
        })
      }
    >
      {props.buttonText}
    </button>
  );
};
