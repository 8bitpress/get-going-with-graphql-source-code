import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import authErrorLink from "./links/authErrorLink";
import typePolicies from "./typePolicies";
import WebSocketLink from "./links/WebSocketLink";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

const wsLink = new WebSocketLink({
  url: process.env.REACT_APP_SUBSCRIPTIONS_ENDPOINT
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authErrorLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache({ typePolicies }),
  connectToDevTools: true,
  link
});

export default client;
