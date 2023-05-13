import { useState } from 'react';
import { VoteButton } from './Buttons';

export const Vote = (): JSX.Element => {
  const cards = [0, 1, 2, 3, 5, 8, 13, 21];

  return (
    <div className="flex gap-2 justify-center">
      {cards.map((val) => (
        <VoteButton key={val} value={val} buttonText={val.toString()} />
      ))}
    </div>
  );
};
