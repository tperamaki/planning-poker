'use client';

import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { GameContext } from './Game';
import { vote } from '@/network';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const VoteButton = (props: {
  value: number;
  buttonText: string;
}): JSX.Element => {
  const { id, playerName, refreshCounter, game, setGame } =
    useContext(GameContext);
  return (
    <button
      className={`border border-solid border-slate-500 rounded-xl px-10 py-5 lg:py-20 hover:bg-neutral-400 dark:hover:bg-neutral-600 ${
        game[playerName] === props.value ? 'bg-slate-600' : ''
      }`}
      onClick={() => {
        refreshCounter();
        setGame((game) => {
          const newGame = { ...game };
          newGame[playerName] = props.value;
          return newGame;
        });
        vote(id, playerName, props.value);
      }}
    >
      {props.buttonText}
    </button>
  );
};

export const NewGameLink = (
  props: PropsWithChildren<{ className: string }>,
) => {
  const pathname = usePathname();
  const [newGameId, setNewGameId] = useState<string>('');

  useEffect(() => {
    setNewGameId(crypto.randomUUID());
  }, [pathname]);

  return (
    <Link className={props.className} href={`/${newGameId}`}>
      {props.children}
    </Link>
  );
};
