import { gql } from "apollo-server";

const typeDefs = gql`
  # ENUMS

  enum Genre {
    ADVENTURE
    CHILDREN
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

  enum AuthorOrderBy {
    NAME_ASC
    NAME_DESC
  }

  enum BookOrderBy {
    TITLE_ASC
    TITLE_DESC
  }

  enum LibraryOrderBy {
    ADDED_ON_ASC
    ADDED_ON_DESC
  }

  enum ReviewOrderBy {
    REVIEWED_ON_ASC
    REVIEWED_ON_DESC
  }

  # OBJECTS

  type Author {
    id: ID!
    books: [Book]
    name: String!
  }

  type Authors {
    results: [Author]
    pageInfo: PageInfo
  }

  type Book {
    id: ID!
    authors: [Author]
    cover: String
    genre: Genre
    reviews(limit: Int, orderBy: ReviewOrderBy, page: Int): Reviews
    title: String!
  }

  type Books {
    results: [Book]
    pageInfo: PageInfo
  }

  type PageInfo {
    hasNextPage: Boolean
    hasPrevPage: Boolean
    page: Int
    perPage: Int
    totalCount: Int
  }

  type Review {
    id: ID!
    book: Book
    rating: Int
    reviewedOn: String
    reviewer: User!
    text: String!
  }

  type Reviews {
    results: [Review]
    pageInfo: PageInfo
  }

  type User {
    id: ID!
    email: String!
    library(limit: Int, orderBy: LibraryOrderBy, page: Int): Books
    name: String
    reviews(limit: Int, orderBy: ReviewOrderBy, page: Int): Reviews
    username: String!
  }

  # INPUTS

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

  # ROOT

  type Query {
    author(id: ID!): Author
    authors(limit: Int, orderBy: AuthorOrderBy, page: Int): Authors
    book(id: ID!): Book
    books(limit: Int, orderBy: BookOrderBy, page: Int): Books
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
