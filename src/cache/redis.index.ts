import { createClient } from 'redis';
import Configs from '../config/configuration';
import { logger } from '../logging/logger.service';

const redisURL = `redis://localhost:${Configs().REDIS_PORT}`;

const client = createClient({ url: redisURL });

client.on('connect', () => logger.info('Cache is connecting'));
client.on('ready', () => logger.info('Cache is ready'));
client.on('end', () => logger.info('Cache disconnected'));
client.on('reconnecting', () => logger.info('Cache is reconnecting'));
client.on('error', (e) => logger.error(e));

(async () => {
  await client.connect();
})();

// If the Node process ends, close the Cache connection
process.on('SIGINT', async () => {
  await client.disconnect();
});

export default client;
