import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const redisUrlString = process.env.REDIS_URL_STRING ?? 'redis://localhost:6379';

interface Params {
  params: { id: string };
}

// Get state for the game
export async function GET(request: Request, { params }: Params) {
  const redis = new Redis(redisUrlString);
  const game = JSON.parse((await redis.get(`game-${params.id}`)) ?? '{}');
  await redis.quit();
  return NextResponse.json(game);
}

// Delete a game, meaning a full reset
export async function DELETE(request: Request, { params }: Params) {
  const redis = new Redis(redisUrlString);
  await redis.getdel(`game-${params.id}`);
  await redis.quit();
}
