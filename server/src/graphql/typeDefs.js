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
    cover: String
    reviews: [Review]
    title: String!
  }

  type Review {
    id: ID!
    book: Book
    rating: Int!
    text: String
  }

  type Query {
    author(id: ID!): Author
    authors: [Author]
    book(id: ID!): Book
    books: [Book]
  }
`;

export default typeDefs;
