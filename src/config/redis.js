import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_ENDPOINT}:6379`
});

redisClient.connect().then(() => {
  console.log('Connected to redis');
}).catch(err => {
  console.error('Redis connection error:', err);
});

export default redisClient;
