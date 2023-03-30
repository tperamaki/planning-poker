'use client';
import { useCallback, useEffect, useState } from 'react';
import { Vote } from './Vote';
import JoinGame from './JoinGame';

async function getGame(gameId: string): Promise<string[]> {
  const res = await fetch(`http://localhost:3000/api/game/${gameId}`, {
    cache: 'no-store',
  });
  return res.json();
}

export const Game = (props: { id: string }): JSX.Element => {
  // TODO: Move these to react context
  // TODO: is ID available to components?
  const [game, setGame] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState<string>();

  const fetchGame = useCallback(async () => {
    const newGame = await getGame(props.id);
    setGame(newGame ?? []);
  }, [props.id]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  return (
    <div>
      <div>
        {Object.entries(game).map(([name, value]) => (
          <p key={name}>{`${name}: ${value}`}</p>
        ))}
      </div>

      {playerName ? (
        <Vote id={props.id} playerName={playerName} />
      ) : (
        <JoinGame id={props.id} />
      )}
    </div>
  );
};
