import { createClient } from 'redis';
const redisClient = createClient();

redisClient.connect().then(() => {
  console.log('Connected to redis');
}).catch(err => {
  console.error('Redis connection error:', err);
});

export default redisClient;
