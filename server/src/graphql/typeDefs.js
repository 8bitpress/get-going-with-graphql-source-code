import { gql } from "apollo-server";

const typeDefs = gql`
  enum Genre {
    ADVENTURE
    CHILDRENS
    CLASSICS
    COMIC_GRAPHIC_NOVEL
    DETECTIVE_MYSTERY
    DYSTOPIA
    FANTASY
    HORROR
    HUMOR
    NON_FICTION
    SCIENCE_FICTION
    ROMANCE
    THRILLER
    WESTERN
  }

  type Author {
    id: ID!
    books: [Book]
    name: String!
  }

  type Book {
    id: ID!
    authors: [Author]
    cover: String
    genre: Genre
    reviews: [Review]
    title: String!
  }

  type Review {
    id: ID!
    book: Book
    rating: Int
    reviewedOn: String
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
    authorIds: [ID]
    cover: String
    genre: Genre
    summary: String
    title: String!
  }

  input CreateReviewInput {
    bookId: ID!
    rating: Int!
    reviewerId: ID!
    text: String
  }

  input SignUpInput {
    email: String!
    name: String
    username: String!
  }

  input UpdateLibraryBooksInput {
    bookIds: [ID!]!
    userId: ID!
  }

  input UpdateReviewInput {
    id: ID!
    rating: Int!
    text: String
  }

  type Query {
    author(id: ID!): Author
    authors: [Author]
    book(id: ID!): Book
    books: [Book]
    review(id: ID!): Review
    user(username: String!): User
  }

  type Mutation {
    addBooksToLibrary(input: UpdateLibraryBooksInput!): User!
    createAuthor(name: String!): Author!
    createBook(input: CreateBookInput!): Book!
    createReview(input: CreateReviewInput!): Review!
    deleteReview(id: ID!): Boolean!
    removeBooksFromLibrary(input: UpdateLibraryBooksInput!): User!
    signUp(input: SignUpInput!): User!
    updateReview(input: UpdateReviewInput!): Review!
  }
`;

export default typeDefs;
