import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import typePolicies from "./typePolicies";

const client = new ApolloClient({
  cache: new InMemoryCache({ typePolicies }),
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT }),
  connectToDevTools: true
});

export default client;
