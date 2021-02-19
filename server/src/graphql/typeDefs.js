import { gql } from "apollo-server";

const typeDefs = gql`
  type Author {
    id: ID!
    books: [Book]
    name: String!
  }

  type Book {
    id: ID!
    authors: [Author]
    title: String!
  }

  type Query {
    authors: [Author]
    books: [Book]
  }
`;

export default typeDefs;
