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
    rating: Int
    reviewer: User!
    text: String!
  }

  type User {
    id: ID!
    email: String!
    library: [Book]
    name: String
    reviews: [Review]
    username: String!
  }

  input CreateBookInput {
    authorIDs: [ID]
    cover: String
    summary: String
    title: String!
  }

  type Query {
    author(id: ID!): Author
    authors: [Author]
    book(id: ID!): Book
    books: [Book]
    user(username: String!): User
  }

  type Mutation {
    createAuthor(name: String!): Author!
    createBook(input: CreateBookInput!): Book!
  }
`;

export default typeDefs;
