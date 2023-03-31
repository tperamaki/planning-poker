'use client';
import { useCallback, useEffect, useState, createContext } from 'react';
import { Vote } from './Vote';
import JoinGame from './JoinGame';

async function getGame(gameId: string): Promise<string[]> {
  const res = await fetch(`http://localhost:3000/api/game/${gameId}`, {
    cache: 'no-store',
  });
  return res.json();
}

type GameContextType = {
  id: string;
  game: string[];
  setGame: (game: string[]) => void;
  playerName: string;
  setPlayerName: (game: string) => void;
};

export const GameContext = createContext<GameContextType>({
  id: '',
  game: [],
  setGame: () => null,
  playerName: '',
  setPlayerName: () => null,
});

export const Game = (props: { id: string }): JSX.Element => {
  const [game, setGame] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState<string>('');

  const fetchGame = useCallback(async () => {
    const newGame = await getGame(props.id);
    setGame(newGame ?? []);
  }, [props.id]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  return (
    <GameContext.Provider
      value={{ id: props.id, game, setGame, playerName, setPlayerName }}
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
