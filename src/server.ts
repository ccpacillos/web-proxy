import { Server } from 'http';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import { Logger, delay } from 'highoutput-utilities';

const logger = new Logger(['server']);

export class App {
  readonly host: string;
  readonly port: number;
  readonly routes: any;
  private app!: Koa;
  private server!: Server;

  constructor(args: { host: string; port: number; routes: any }) {
    this.host = args.host;
    this.port = args.port;
    this.routes = args.routes;
  }

  public start() {
    this.app = new Koa();
    this.app.use(cors());
    this.app.use(bodyParser());
    this.app.use(this.routes);

    try {
      this.server = this.app.listen(
        {
          host: this.host,
          port: this.port,
        },
        () => logger.info('API Started'),
      );
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }

    this.watchExitSignals();
  }

  public async stop(signal?: string) {
    if (signal) logger.info({ signal });

    const close = new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });

    try {
      await Promise.race([close, this.timeout()]);
      logger.info('Server stopped.');
      process.exit();
    } catch (err) {
      logger.error(err);
      process.exit(1);
    }
  }

  private watchExitSignals() {
    process.once('SIGTERM', () => this.stop('SIGTERM'));
    process.once('SIGINT', () => this.stop('SIGINT'));
    process.once('SIGHUP', () => this.stop('SIGHUP'));

    process.on('uncaughtException', (err) => {
      logger.error(err);
      process.exit(-1);
    });
  }

  private async timeout(ms?: string) {
    await delay(ms || '30s');
    throw new Error('Timeout');
  }
}
