import { UserQueryResolver } from '@graphql/resolvers/queries/user';

const staticUsers = [
  {
    id: '70d7f9c5-4642-4d78-924a-188addcb2bd7',
    email: 'random@email.com',
  },
  {
    id: 'c5cc90e8-fbb0-4652-b620-23fbba7eb09d',
    email: 'some@email.com',
  },
];

const Query: UserQueryResolver = {
  users: async (_p) => staticUsers,
};

export { Query };
