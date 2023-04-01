export const joinGame = (
  gameId: string,
  newPlayerName: string
): Promise<Response> => {
  return fetch(`/api/game/${gameId}/${newPlayerName}`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
};

export const vote = (
  gameId: string,
  playerName: string,
  value: number
): Promise<Response> => {
  return fetch(`/api/game/${gameId}/${playerName}`, {
    method: 'PUT',
    body: JSON.stringify({ value: value }),
  });
};

export const getGame = async (gameId: string): Promise<string[]> => {
  const res = await fetch(`/api/game/${gameId}`, {
    cache: 'no-store',
  });
  return res.json();
};
