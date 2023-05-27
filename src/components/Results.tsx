import { useContext } from 'react';
import { GameContext } from './Game';

export const Results = (): JSX.Element => {
  const { game } = useContext(GameContext);

  return (
    <div className="flex gap-2 justify-center">
      {Object.entries(game)
        .filter(([key, _val]) => key !== 'showResults')
        .map(([key, val]) => (
          <div key={key} className="flex flex-col items-center gap-2">
            {key}
            <p
              className={`border border-solid border-slate-500 rounded-xl px-10 py-20`}
            >
              {val}
            </p>
          </div>
        ))}
    </div>
  );
};
