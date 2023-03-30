'use client';

export const VoteButton = (props: {
  value: number;
  gameId: string;
  playerName: string;
  buttonText: string;
}): JSX.Element => (
  <button
    className="border border-solid border-slate-500 rounded-xl px-10 py-20"
    onClick={() =>
      fetch(`/api/game/${props.gameId}/${props.playerName}`, {
        method: 'PUT',
        body: JSON.stringify({ value: props.value }),
      })
    }
  >
    {props.buttonText}
  </button>
);
