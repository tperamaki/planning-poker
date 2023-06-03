import { useContext } from 'react';
import { GameContext } from './Game';
import { kick } from '@/network';

export const PlayerList = (): JSX.Element => {
  const { game, id, refreshCounter, setGame } = useContext(GameContext);

  return (
    <div className="mt-5">
      <h3>Players:</h3>
      <div className="flex flex-col items-between gap-2">
        {Object.entries(game)
          .filter(
            ([key, _val]) => key !== '__showResults' && key !== '__lastUpdated'
          )
          .map(([key, val]) => (
            <div key={key} className="flex flex-row justify-between">
              <p
                className={`${
                  val !== -1 ? 'text-green-600 dark:text-green-400' : ''
                }`}
              >
                {key}
              </p>
              <button
                title={`Kick player ${key}`}
                onClick={() => {
                  refreshCounter();
                  kick(id, key);
                  setGame((game) => {
                    const newGame = { ...game };
                    delete newGame[key];
                    return newGame;
                  });
                }}
                className="text-red-700 dark:text-red-300 rounded border border-black px-2 ml-2 dark:border-white hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-all duration-100 ease-in-out"
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
