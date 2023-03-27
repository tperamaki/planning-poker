import Redis from 'ioredis';

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
};

// Join a game
export async function POST(request: Request, { params }: Params) {
  const redis = new Redis(redisUrlString);
  await setValueForPlayerInGame(params.id, params.name, -1, redis);
  await redis.quit();
}

// Choose a value
export async function PUT(request: Request, { params }: Params) {
  const redis = new Redis(redisUrlString);
  const res = await request.json();
  await setValueForPlayerInGame(params.id, params.name, res.body, redis);
  await redis.quit();
}

// Leave a game or delete a player from game
export async function DELETE(request: Request, { params }: Params) {
  const redis = new Redis(redisUrlString);
  await setValueForPlayerInGame(params.id, params.name, undefined, redis);
  await redis.quit();
}
