import { ApolloServer } from "apollo-server";

import JsonServerApi from "./graphql/dataSources/JsonServerApi.js";
import resolvers from "./graphql/resolvers.js";
import typeDefs from "./graphql/typeDefs.js";
import UniqueDirective from "./graphql/directives/UniqueDirective.js";

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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
