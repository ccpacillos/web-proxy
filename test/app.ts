import { server } from 'src/server';
import agent from 'supertest-koa-agent';
import { Logger } from 'highoutput-utilities';

let app: any;
const logger = new Logger(['test']);

export async function initApp() {
  app = await server.getApp();
}

export async function executeQuery(
  opts: {
    query: string;
    variables: any;
  },
  token?: string,
): Promise<any> {
  if (!app) {
    logger.info('app not initialized');
    await initApp();
  }

  const { body } = await agent(app)
    .post('/graphql')
    .set('Authorization', `Bearer ${token}` || '')
    .send({
      ...opts,
      operationName: null,
    });

  if (body.errors) {
    logger.error(body.errors);
  }

  return body.errors || body.data.res;
}
