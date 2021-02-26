const resolvers = {
  Author: {
    books(author, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthorBooks(author.id);
    }
  },
  Book: {
    authors(book, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookAuthors(book.id);
    },
    reviews(book, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookReviews(book.id);
    }
  },
  Review: {
    book(review, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookById(review.bookId);
    },
    reviewer(review, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserById(review.userId);
    }
  },
  User: {
    library(user, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserLibrary(user.id);
    },
    reviews(user, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserReviews(user.id);
    }
  },
  Query: {
    author(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthorById(id);
    },
    authors(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthors();
    },
    book(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookById(id);
    },
    books(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBooks();
    },
    user(root, { username }, { dataSources }, info) {
      return dataSources.jsonServerApi.getUser(username);
    }
  },
  Mutation: {
    createAuthor(root, { name }, { dataSources }, info) {
      return dataSources.jsonServerApi.createAuthor(name);
    },
    createBook(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.createBook(input);
    }
  }
};

export default resolvers;
