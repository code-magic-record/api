const dotenv = require('dotenv');
dotenv.config();

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const Redis = require('ioredis');
const prefix = 'duowan';

let redis = null;
if (!redis) {
  const config = {
    port: REDIS_PORT || 6379,
    host: REDIS_HOST || '127.0.0.1',
    password: REDIS_PASSWORD || '',
    keyPrefix: prefix,
  };
  redis = new Redis(config);

  redis.on('error', (err) => {
    console.log('createRedisClient err1', prefix, err, JSON.stringify(err));
  });

  redis.on('connect', () => {
    console.log('createRedisClient connect');
  });

  setTimeout(() => {
    redis.set('abc', '0', 'EX', 20);
    redis.get('abc', (err, res) => {
      if (err) {
        console.log('redis test err: ', err);
      } else {
        console.log('redis test suc: ', res);
      }
    });
  }, 2000);
}

module.exports = redis;
