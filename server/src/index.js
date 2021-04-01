import http from "http";

import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { useServer } from "graphql-ws/lib/use/ws";
import cors from "cors";
import express from "express";
import expressJwt from "express-jwt";
import ws from "ws";

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
const schemaWithPermissions = applyMiddleware(schema, permissions);

const server = new ApolloServer({
  schema: schemaWithPermissions,
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
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  const wsServer = new ws.Server({ server: httpServer, path: "/graphql" });
  useServer(
    {
      schema: schemaWithPermissions,
      context: ctx => {
        const jsonServerApi = new JsonServerApi();
        jsonServerApi.initialize({ context: ctx, cache: undefined });
        return { dataSources: { jsonServerApi } };
      }
    },
    wsServer
  );

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${wsServer.options.path}`
  );
});
