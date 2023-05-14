import { useContext } from 'react';
import { GameContext } from './Game';

export const Results = (): JSX.Element => {
  const { game } = useContext(GameContext);

  return (
    <div className="flex gap-2 justify-center">
      {Object.entries(game)
        .filter(([key, _val]) => key !== 'showResults')
        .map(([key, val]) => (
          <p key={key}>
            {key}: {val}
          </p>
        ))}
    </div>
  );
};
