import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {
  resolver,
  attributeFields,
} from 'graphql-sequelize';

import {User} from './models';

class Viewer extends Object {}
const getViewer = () => new Viewer();

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {id, type} = fromGlobalId(globalId);

    switch (type) {
    case 'User':
      return User.findById(id);
    case 'Viewer':
      return getViewer();
    default:
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Vewer) {
      return viewerType;
    } else if (obj instanceof User) {
      return userType; // eslint-disable-line
    }

    return null;
  },
);
const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    ...attributeFields(User),
    id: globalIdField('User'),
  }),
  interfaces: [nodeInterface],
});

const {connectionType: userConnection} = connectionDefinitions({
  name: 'User',
  nodeType: userType,
});

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    users: {
      type: userConnection,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromArray(
        await User.findAll({
          limit: args.first,
        }),
        args
      ),
    }
  }),
  interfaces: [nodeInterface],
});

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: viewerType,
      resolve: () => getViewer(),
    }
  }),
});

export default new GraphQLSchema({
  query: queryType,
});
