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
import { getGame, resetGame } from '@/network';

const INACTIVE_AFTER_MS = 15000;
const FETCH_INTERVAL_MS = 5000;

// TODO: When inactive, show popup to allow restarting fetching
// TODO: Show results only after clicking something
// TODO: Show results only after clicking something, online version
// TODO: Resetting game
// TODO: Kick players

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
        console.log(game);
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
          {Object.entries(game).map(([name, value]) => (
            <p key={name}>{`${name}: ${value}`}</p>
          ))}
          <button onClick={() => resetGame(props.id)}>Reset game</button>
          {fetching && 'LOADING...'}
          {Date.now() - lastActive > INACTIVE_AFTER_MS && (
            <div>
              <p>Stopped refreshing due inactivity, click here to restart</p>
              <button onClick={refreshCounter}>Im back!</button>
            </div>
          )}
        </div>

        {playerName ? <Vote /> : <JoinGame />}
      </div>
    </GameContext.Provider>
  );
};
