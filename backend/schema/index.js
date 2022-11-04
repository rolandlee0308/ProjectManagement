// import { gql } from "apollo-server-express";
const { gql } = require("apollo-server-express");
// import { ClientTypes, ClientQuery } from "./client";
const { ClientTypes, ClientQuery } = require("./client");

// remember we only use gql in this file. types in other files are just simple strings
module.exports.typeDefs = gql`
  type Query
  # type Mutation
  ${ClientTypes}
`;
module.exports.resolvers = {
  Query: {
    ...ClientQuery,
  },
  // Mutation: {},
};
