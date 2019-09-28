import * as path from 'path';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'apollo-server-koa';

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, 'resolvers'), { recursive: true }),
);

const typeDefs = mergeTypes(
  fileLoader(path.join(process.cwd(), 'graphql'), { recursive: true }),
  { all: true },
);

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});
