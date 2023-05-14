'use client';
import {
  useCallback,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Vote } from './Vote';
import JoinGame from './JoinGame';
import { getGame, resetGame, showResults } from '@/network';
import { Results } from './Results';
import { PlayerList } from './PlayerList';

const INACTIVE_AFTER_MS = 5 * 60 * 1000;
const FETCH_INTERVAL_MS = 2 * 1000;

// TODO: When inactive, show popup to allow restarting fetching, instead of ugly non-button text thingy
// TODO: Make it look good

type GameContextType = {
  id: string;
  game: Record<string, number>;
  setGame: Dispatch<SetStateAction<Record<string, number>>>;
  playerName: string;
  setPlayerName: (game: string) => void;
  refreshCounter: () => void;
};

export const GameContext = createContext<GameContextType>({
  id: '',
  game: {},
  setGame: () => null,
  playerName: '',
  setPlayerName: () => null,
  refreshCounter: () => null,
});

export const Game = (props: { id: string }): JSX.Element => {
  const [game, setGame] = useState<Record<string, number>>({});
  const [playerName, setPlayerName] = useState<string>('');
  const [lastActive, setLastActive] = useState<number>(Date.now());
  const [fetching, setFetching] = useState<boolean>(false);

  const refreshCounter = () => {
    setLastActive(Date.now());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActive > INACTIVE_AFTER_MS) return;
      setFetching(true);
      getGame(props.id).then((game) => {
        if (game) {
          setGame(game);
        }
        setFetching(false);
      });
    }, FETCH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [props.id, lastActive]);

  return (
    <GameContext.Provider
      value={{
        id: props.id,
        game,
        setGame,
        playerName,
        setPlayerName,
        refreshCounter,
      }}
    >
      <div>
        <div>
          <button
            onClick={() => {
              resetGame(props.id);
              setGame((game) => {
                return Object.fromEntries(
                  Object.entries(game).map(([key, _value]) => [key, -1])
                );
              });
            }}
          >
            Reset game
          </button>
          <br />
          <button
            onClick={() => {
              showResults(props.id);
              setGame((game) => {
                const newGame = { ...game };
                newGame['showResults'] = 1;
                return newGame;
              });
            }}
          >
            Show results
          </button>
          {Date.now() - lastActive > INACTIVE_AFTER_MS - FETCH_INTERVAL_MS && (
            <div>
              <p>Stopped refreshing due inactivity, click here to restart</p>
              <button onClick={refreshCounter}>Im back!</button>
            </div>
          )}
        </div>

        <PlayerList />

        {game.showResults === 1 ? (
          <Results />
        ) : playerName === '' ? (
          <JoinGame />
        ) : (
          <Vote />
        )}
      </div>
    </GameContext.Provider>
  );
};
