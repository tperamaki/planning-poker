import Redis from 'ioredis';
import { NextResponse } from 'next/server';

const redisUrlString = process.env.REDIS_URL_STRING ?? 'redis://localhost:6379';

interface Params {
  params: { id: string; name: string };
}

const setValueForPlayerInGame = async (
  gameId: string,
  playerName: string,
  value: number | undefined,
  redis: Redis
) => {
  const game = JSON.parse((await redis.get(`game-${gameId}`)) ?? '{}');
  game[playerName] = value;
  await redis.set(`game-${gameId}`, JSON.stringify(game));
  return NextResponse.json({});
};

// Join a game
export async function POST(request: Request, { params }: Params) {
  const redis = new Redis(redisUrlString);
  await setValueForPlayerInGame(params.id, params.name, -1, redis);
  await redis.quit();
  return NextResponse.json({});
}

// Vote a value
export async function PUT(request: Request, { params }: Params) {
  const redis = new Redis(redisUrlString);
  const res = await request.json();
  await setValueForPlayerInGame(params.id, params.name, res.value, redis);
  await redis.quit();
  return NextResponse.json({});
}

// Leave a game or delete a player from game
export async function DELETE(request: Request, { params }: Params) {
  const redis = new Redis(redisUrlString);
  await setValueForPlayerInGame(params.id, params.name, undefined, redis);
  await redis.quit();
  return NextResponse.json({});
}
