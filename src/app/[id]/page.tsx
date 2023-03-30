import { Game } from '../../components/Game';

export default async function GamePage(props: { id: string }) {
  return (
    <main>
      <div>
        <h2 className="text-xl font-bold">Room ID</h2>
        <p>{props.id}</p>
        <Game id={props.id} />
      </div>
    </main>
  );
}
