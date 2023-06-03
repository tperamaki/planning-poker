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

export const kick = (gameId: string, playerName: string): Promise<Response> => {
  return fetch(`/api/game/${gameId}/${playerName}`, {
    method: 'DELETE',
  });
};

export const showResults = (gameId: string): Promise<Response> => {
  return fetch(`/api/game/${gameId}/__showResults`, {
    method: 'PUT',
    body: JSON.stringify({ value: 1 }),
  });
};

export const getGame = async (
  gameId: string
): Promise<Record<string, number>> => {
  const res = await fetch(`/api/game/${gameId}`, {
    cache: 'no-store',
  });
  return res.json();
};

export const resetGame = async (gameId: string): Promise<boolean> => {
  const res = await fetch(`/api/game/${gameId}`, {
    method: 'DELETE',
  });
  return res.ok;
};
