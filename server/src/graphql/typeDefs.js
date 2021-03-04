import { gql } from "apollo-server";

const typeDefs = gql`
  # SCALARS

  scalar DateTime

  scalar Rating

  # ENUMS

  """
  Literary genres that classify books.
  """
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

  """
  Sorting options for authors.
  """
  enum AuthorOrderBy {
    NAME_ASC
    NAME_DESC
  }

  """
  Sorting options for books.
  """
  enum BookOrderBy {
    TITLE_ASC
    TITLE_DESC
  }

  """
  Sorting options for books in a user's library.
  """
  enum LibraryOrderBy {
    ADDED_ON_ASC
    ADDED_ON_DESC
  }

  """
  Sorting options for reviews.
  """
  enum ReviewOrderBy {
    REVIEWED_ON_ASC
    REVIEWED_ON_DESC
  }

  """
  Sorting options for search results.
  """
  enum SearchOrderBy {
    RESULT_ASC
    RESULT_DESC
  }

  # INTERFACES

  """
  Specifies fields shared by people (including authors and users).
  """
  interface Person {
    id: ID!
    name: String!
  }

  # UNIONS

  """
  Types that can be returned from book-related search results.
  """
  union BookResult = Book | Author

  # OBJECTS

  """
  An author is a person who wrote one or more books.
  """
  type Author implements Person {
    "The unique ID of the author."
    id: ID!
    "Books that were authored or co-authored by this person."
    books: [Book]
    "The full name of the author."
    name: String!
  }

  """
  A list of author results with pagination information.
  """
  type Authors {
    "A list of author results."
    results: [Author]
    "Information to assist with pagination."
    pageInfo: PageInfo
  }

  """
  A written work that can be attributed to one or more authors and can be reviewed by users.
  """
  type Book {
    "The unique ID of the book."
    id: ID!
    "The author(s) who wrote the books"
    authors: [Author]
    "The URL of the book's cover image."
    cover: String
    "A literary genre to which the book can be assigned."
    genre: Genre
    """
    User-submitted reviews of the book.

    Default sort order is REVIEWED_ON_DESC.
    """
    reviews(limit: Int = 20, orderBy: ReviewOrderBy, page: Int): Reviews
    "The title of the book."
    title: String!
  }

  """
  A list of book results with pagination information.
  """
  type Books {
    "A list of book results."
    results: [Book]
    "Information to assist with pagination."
    pageInfo: PageInfo
  }

  """
  Contains information about the current page of results.
  """
  type PageInfo {
    "Whether there are items to retrieve on a subsequent page."
    hasNextPage: Boolean
    "Whether there are items to retrieve on a preceding page."
    hasPrevPage: Boolean
    "The current page number."
    page: Int
    "The number of items retrieved per page."
    perPage: Int
    "The total item count across all pages."
    totalCount: Int
  }

  """
  A user-submitted assessment of a book that may include a numerical rating.
  """
  type Review {
    "The unique ID of the review."
    id: ID!
    "The book to which the review applies."
    book: Book
    "The user's integer-based rating of the book (from 1 to 5)."
    rating: Rating!
    "The date and time the review was created."
    reviewedOn: DateTime!
    "The user who submitted the book review."
    reviewer: User!
    "The text-based content of the review."
    text: String
  }

  """
  A list of review results with pagination information.
  """
  type Reviews {
    "A list of review results."
    results: [Review]
    "Information to assist with pagination."
    pageInfo: PageInfo
  }

  """
  A user account provides authentication and library details.
  """
  type User implements Person {
    "The unique ID of the user."
    id: ID!
    "The email address of the user (must be unique)."
    email: String!
    """
    A list of books the user has added to their library.

    Default sort order is ADDED_ON_DESC.
    """
    library(limit: Int = 20, orderBy: LibraryOrderBy, page: Int): Books
    "The full name of the user."
    name: String!
    """
    A list of book reviews created by the user.

    Default sort order is REVIEWED_ON_DESC.
    """
    reviews(limit: Int = 20, orderBy: ReviewOrderBy, page: Int): Reviews
    "The user's chosen username (must be unique)."
    username: String!
  }

  # INPUTS

  """
  Provides data to create a book.
  """
  input CreateBookInput {
    "The IDs of the authors who wrote the book."
    authorIds: [ID]
    """
    The URL of the book's cover image. Covers available via the Open Library Covers API:

    https://openlibrary.org/dev/docs/api/covers
    """
    cover: String
    "A literary genre to which the book can be assigned."
    genre: Genre
    "A short summary of the book's content."
    summary: String
    "The title of the book."
    title: String!
  }

  """
  Provides data to create a review.
  """
  input CreateReviewInput {
    "The unique ID of the book a user is reviewing."
    bookId: ID!
    "The user's integer-based rating of the book (from 1 to 5)."
    rating: Rating!
    "The ID of the user submitting the review."
    reviewerId: ID!
    "The text-based content of the review."
    text: String
  }

  """
  Provides data to create a user.
  """
  input SignUpInput {
    "The email address of the user (must be unique)."
    email: String!
    "The full name of the user."
    name: String
    "The user's chosen username (must be unique)."
    username: String!
  }

  """
  Provides data to add or remove books from a user's library.
  """
  input UpdateLibraryBooksInput {
    "The IDs of the books to add or remove from the user's library."
    bookIds: [ID!]!
    "The ID of the user whose library should be updated."
    userId: ID!
  }

  """
  Provides data to update a review.
  """
  input UpdateReviewInput {
    "The unique ID of the review a user is updating."
    id: ID!
    "The user's integer-based rating of the book (from 1 to 5)."
    rating: Rating!
    "The text-based content of the review."
    text: String
  }

  # ROOT

  type Query {
    "Retrieves a single author by ID."
    author(id: ID!): Author
    """
    Retrieves a list of authors with pagination information.

    Default sort order is NAME_ASC.
    """
    authors(limit: Int = 20, orderBy: AuthorOrderBy, page: Int): Authors
    "Retrieves a single book by ID."
    book(id: ID!): Book
    """
    Retrieves a list of books with pagination information.

    Default sort order is TITLE_ASC.
    """
    books(limit: Int = 20, orderBy: BookOrderBy, page: Int): Books
    "Retrieves a single book by ID."
    review(id: ID!): Review
    """
    Performs a search of books titles and author names.

    Default sort order is RESULTS_ASC.
    """
    searchBooks(query: String!, orderBy: SearchOrderBy): [BookResult]
    """
    Performs a search of author and user names.

    Default sort order is RESULTS_ASC.
    """
    searchPeople(query: String!, orderBy: SearchOrderBy): [Person]
    "Retrieves a single user by username."
    user(username: String!): User
  }

  type Mutation {
    "Adds books to user's library."
    addBooksToLibrary(input: UpdateLibraryBooksInput!): User!
    "Creates a new author."
    createAuthor(name: String!): Author!
    "Creates a new book."
    createBook(input: CreateBookInput!): Book!
    "Creates a new review."
    createReview(input: CreateReviewInput!): Review!
    "Deletes a review."
    deleteReview(id: ID!): Boolean!
    "Remove books currently in a user's library."
    removeBooksFromLibrary(input: UpdateLibraryBooksInput!): User!
    "Create a new user."
    signUp(input: SignUpInput!): User!
    "Updates a review."
    updateReview(input: UpdateReviewInput!): Review!
  }
`;

export default typeDefs;
