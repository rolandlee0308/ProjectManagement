const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const { typeDefs, resolvers } = require("./schema");

connectDB();

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    persistedQueries: false,
    resolvers,
  });

  await server.start();

  const app = express();
  app.use(express.json());

  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  // Modified server startup
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`Listening on port ${PORT}`);
}

startApolloServer(typeDefs, resolvers);
