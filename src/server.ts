import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import koa2Cors from 'koa2-cors';
import { schema } from './schema';

let apolloServer: ApolloServer;

export const server = {
  getApp: async () => {
    apolloServer = new ApolloServer({
      schema,
      context: ({ ctx }) => ctx,
    });

    const app = new Koa();
    app.use(koa2Cors());
    app.use(koaBodyparser());
    apolloServer.applyMiddleware({ app });
    return app;
  },

  stop: async () => {
    await apolloServer.stop();
  },
};
