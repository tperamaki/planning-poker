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
      <body className="bg-neutral-300 dark:bg-neutral-800 dark:text-white">
        <nav className="flex gap-1">
          <div className="flex-1">
            <Link href="/">Home</Link>
          </div>
          <div className="flex-initial">
            <h1 className="text-xl">Planning poker</h1>
          </div>
          <div className="flex-1 text-right">
            <Link href={`/${newGameId}`}>Create new</Link>
          </div>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  );
}
