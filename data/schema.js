import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} from 'graphql';

import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
} from 'graphql-relay';

let __lastId = 0;
class User extends Object {}

const getUser = () => {
  const user = new User();

  user.id = `USER_${++__lastId}`;
  user.firstName = 'Christian';
  user.email = 'admin@react-relay-redux.com';

  return user;
};

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type} = fromGlobalId(globalId);

    switch (type) {
    case 'User':
      return userType; // eslint-disable-line
    default:
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return getUser();
    }

    return null;
  },
);

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    firstName: {
      type: GraphQLString,
      description: 'The user\'s first name.',
    },
    email: {
      type: GraphQLString,
      description: 'The user\'s first name.',
    },
  }),
  interface: [nodeInterface],
});

const queryType = new GraphQLObjectType({
  name: 'Root Query',
  node: nodeField,
  fields: () => ({
    user: {
      type: userType,
      resolve: () => getUser(),
    },
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
