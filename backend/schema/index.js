const { gql } = require("apollo-server-express");
const { ClientTypes, ClientQuery, ClientMutation } = require("./client");
const {
  ProjectQuery,
  ProjectTypes,
  ProjectMutation,
  ProjectResolver,
} = require("./project");
const { GlobalResolver } = require("./util/resolver");

module.exports.typeDefs = gql`
  type Query
  type Mutation
  ${ClientTypes}
  ${ProjectTypes}
`;

module.exports.resolvers = {
  Query: {
    ...ClientQuery,
    ...ProjectQuery,
  },
  Mutation: {
    ...ClientMutation,
    ...ProjectMutation,
  },
  Project: ProjectResolver,
  ...GlobalResolver
};
