import { GraphQLResolveInfo } from 'graphql';

export interface GQLResolver<TArgs, TResult, TParent> {
  (
    parent: TParent,
    args: TArgs,
    context: any,
    info: GraphQLResolveInfo,
  ): Promise<TResult>;
}
