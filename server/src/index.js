import { ApolloServer } from "apollo-server";

import JsonServerApi from "./graphql/dataSources/JsonServerApi.js";
import resolvers from "./graphql/resolvers.js";
import typeDefs from "./graphql/typeDefs.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      jsonServerApi: new JsonServerApi()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
