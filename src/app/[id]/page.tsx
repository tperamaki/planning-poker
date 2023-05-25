import { Game } from '../../components/Game';

export default async function GamePage({ params }: { params: { id: string } }) {
  return (
    <main>
      <div>
        <Game id={params.id} />
      </div>
    </main>
  );
}
