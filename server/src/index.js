import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";

import JsonServerApi from "./graphql/dataSources/JsonServerApi.js";
import resolvers from "./graphql/resolvers.js";
import typeDefs from "./graphql/typeDefs.js";
import UniqueDirective from "./graphql/directives/UniqueDirective.js";

const port = process.env.GRAPHQL_API_PORT;
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000" }));
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      jsonServerApi: new JsonServerApi()
    };
  },
  schemaDirectives: {
    unique: UniqueDirective
  }
});

server.applyMiddleware({ app, path: "/", cors: false });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
