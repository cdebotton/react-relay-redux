import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

const queryType = new GraphQLObjectType({
  name: 'Root Query',
  fields: () => ({

  }),
});

const mutationType = new GraphQLObjectType({
  name: 'Root Mutation',
  fields: () => ({

  }),
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
