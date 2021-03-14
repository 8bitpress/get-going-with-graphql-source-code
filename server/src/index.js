import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import cors from "cors";
import express from "express";
import expressJwt from "express-jwt";

import { getToken, handleInvalidToken } from "./utils/tokens.js";
import cookieHeaderPlugin from "./graphql/plugins/cookieHeaderPlugin.js";
import JsonServerApi from "./graphql/dataSources/JsonServerApi.js";
import permissions from "./graphql/permissions.js";
import resolvers from "./graphql/resolvers.js";
import typeDefs from "./graphql/typeDefs.js";
import UniqueDirective from "./graphql/directives/UniqueDirective.js";

const port = process.env.GRAPHQL_API_PORT;
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: ["https://studio.apollographql.com", "http://localhost:3000"]
    })
  );
}

app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
    getToken
  }),
  handleInvalidToken
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    unique: UniqueDirective
  }
});

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  dataSources: () => {
    return {
      jsonServerApi: new JsonServerApi()
    };
  },
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  },
  plugins: [cookieHeaderPlugin]
});

server.applyMiddleware({ app, cors: false });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
