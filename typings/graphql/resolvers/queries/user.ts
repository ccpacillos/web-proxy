import { User } from '@graphql/types';
import { GQLResolver } from '../resolver';

export interface UserQueryResolver {
  users: GQLResolver<{}, User[], undefined>;
}
