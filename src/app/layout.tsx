import { randomUUID } from 'crypto';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Planning Poker',
  description: 'Planning poker for Scrum',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const newGameId = randomUUID();
  return (
    <html lang="en">
      <body className="bg-neutral-300 dark:bg-neutral-800 dark:text-white m-5">
        <nav className="flex gap-1">
          <div className="flex-1">
            <Link
              className="p-2 rounded border-2 border-black dark:border-white hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-all duration-100 ease-in-out"
              href="/"
            >
              Home
            </Link>
          </div>
          <div className="flex-initial">
            <h1 className="text-xl">Planning poker</h1>
          </div>
          <div className="flex-1 text-right">
            <Link
              className="p-2 rounded border-2 border-black dark:border-white hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-all duration-100 ease-in-out"
              href={`/${newGameId}`}
            >
              Create new
            </Link>
          </div>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  );
}
