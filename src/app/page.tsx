import { randomUUID } from 'crypto';
import Link from 'next/link';

export default function LandingPage() {
  const newGameId = randomUUID();
  return (
    <main>
      <h2 className="text-3xl font-bold mt-5 mb-5">
        Welcome to planning poker.
      </h2>
      <p>
        Use a link from your friend/colleague to join, or{' '}
        <Link
          className="underline hover:text-red-800 dark:hover:text-red-200"
          href={`/${newGameId}`}
        >
          create a new room.
        </Link>
      </p>
    </main>
  );
}
