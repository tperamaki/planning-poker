async function getGame(gameId: string): Promise<string[]> {
  const res = await fetch(`http://localhost:3000/api/game/${gameId}`, {
    cache: 'no-store',
  });
  return res.json();
}

async function joinGame(gameId: string, name: string): Promise<boolean> {
  const res = await fetch(`http://localhost:3000/api/game/${gameId}`, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  return res.ok;
}

async function answer(
  gameId: string,
  name: string,
  value: number
): Promise<boolean> {
  const res = await fetch(`http://localhost:3000/api/game/${gameId}`, {
    method: 'PUT',
    body: JSON.stringify({ name, value }),
  });

  return res.json();
}

async function resetGame(gameId: string): Promise<boolean> {
  const res = await fetch(`http://localhost:3000/api/game/${gameId}`, {
    method: 'DELETE',
  });

  return res.json();
}

async function removePlayer(gameId: string, name: string): Promise<boolean> {
  const res = await fetch(`http://localhost:3000/api/game/${gameId}/${name}`, {
    method: 'DELETE',
  });

  return res.json();
}

export default async function Poker({ params }: { params: { id: string } }) {
  const gameData = getGame(params.id);

  const [game] = await Promise.all([gameData]);

  const name = 'kissa';

  return (
    <main>
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello poker {params.id}
        </h1>
        <p>
          {Object.entries(game).map(([name, value]) => {
            return <p key={name}>{`${name}: ${value}`}</p>;
          })}
        </p>
        <form action={`/api/game/${params.id}/${name}`} method="post">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
