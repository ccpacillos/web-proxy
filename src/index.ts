import { delay, Logger } from 'highoutput-utilities';
import { server } from './server';

const logger = new Logger(['server']);
const { HOST = 'localhost', PORT = 8000 } = process.env;

async function timeout() {
  await delay('30s');
  throw new Error('Timeout');
}

async function exit(signal: string) {
  logger.info({ signal });
  try {
    await Promise.race([server.stop(), timeout()]);
    logger.info('Server stopped');
    process.exit();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

export async function start() {
  process.once('SIGTERM', () => exit('SIGTERM'));
  process.once('SIGINT', () => exit('SIGINT'));
  process.once('SIGHUP', () => exit('SIGHUP'));

  process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(-1);
  });

  try {
    const app = await server.getApp();
    app.listen({ host: HOST, port: PORT }, () => logger.info('API started.'));
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

start();
