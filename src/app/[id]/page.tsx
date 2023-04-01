import { Game } from '../../components/Game';

export default async function GamePage({ params }: { params: { id: string } }) {
  return (
    <main>
      <div>
        <h2 className="text-xl font-bold">Room ID</h2>
        <p>{params.id}</p>
        <Game id={params.id} />
      </div>
    </main>
  );
}
