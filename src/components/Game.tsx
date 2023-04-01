'use client';
import { useCallback, useEffect, useState, createContext } from 'react';
import { Vote } from './Vote';
import JoinGame from './JoinGame';
import { getGame } from '@/network';

const ACTIVE_COUNTER_START_VALUE = 20;
const FETCH_INTERVAL_MS = 5000;

// TODO: When inactive, show popup to allow restarting fetching
// TODO: Show results only after clicking something
// TODO: Resetting game

type GameContextType = {
  id: string;
  game: string[];
  setGame: (game: string[]) => void;
  playerName: string;
  setPlayerName: (game: string) => void;
  activeCounter: number;
  setActiveCounter: (value: number) => void;
  refreshCounter: () => void;
};

export const GameContext = createContext<GameContextType>({
  id: '',
  game: [],
  setGame: () => null,
  playerName: '',
  setPlayerName: () => null,
  activeCounter: ACTIVE_COUNTER_START_VALUE,
  setActiveCounter: () => null,
  refreshCounter: () => null,
});

export const Game = (props: { id: string }): JSX.Element => {
  const [game, setGame] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [activeCounter, setActiveCounter] = useState<number>(
    ACTIVE_COUNTER_START_VALUE
  );
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const fetchGame = useCallback(async () => {
    const newGame = await getGame(props.id);
    setGame(newGame ?? []);
    setTimerActive(true);
    if (!timerActive && activeCounter > 0) {
      setTimerActive(true);
      setActiveCounter((prev) => prev - 1);
      setTimeout(() => {
        setTimerActive(false);
        fetchGame();
      }, FETCH_INTERVAL_MS);
    }
  }, [activeCounter, props.id, timerActive]);

  const refreshCounter = useCallback(async () => {
    setActiveCounter(ACTIVE_COUNTER_START_VALUE);
    fetchGame();
  }, [fetchGame]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  return (
    <GameContext.Provider
      value={{
        id: props.id,
        game,
        setGame,
        playerName,
        setPlayerName,
        activeCounter,
        setActiveCounter,
        refreshCounter,
      }}
    >
      <div>
        <div>
          {Object.entries(game).map(([name, value]) => (
            <p key={name}>{`${name}: ${value}`}</p>
          ))}
        </div>

        {playerName ? <Vote /> : <JoinGame />}
      </div>
    </GameContext.Provider>
  );
};
