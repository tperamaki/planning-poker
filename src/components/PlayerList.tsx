import { useContext } from 'react';
import { GameContext } from './Game';
import { kick } from '@/network';

export const PlayerList = (): JSX.Element => {
  const { game, id, refreshCounter, setGame } = useContext(GameContext);

  return (
    <div className="flex gap-2 justify-center">
      {Object.entries(game)
        .filter(([key, _val]) => key !== 'showResults')
        .map(([key, val]) => (
          <p key={key}>
            {key}{' '}
            <button
              onClick={() => {
                refreshCounter();
                kick(id, key);
                setGame((game) => {
                  const newGame = { ...game };
                  delete newGame[key];
                  return newGame;
                });
              }}
              className="text-red-300"
            >
              X
            </button>
          </p>
        ))}
    </div>
  );
};
