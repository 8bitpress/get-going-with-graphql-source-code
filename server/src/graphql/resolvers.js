const resolvers = {
  Author: {
    books(author, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthorBooks(author.id);
    }
  },
  Book: {
    authors(book, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookAuthors(book.id);
    }
  },
  Query: {
    author(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthor(id);
    },
    authors(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthors();
    },
    book(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getBook(id);
    },
    books(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBooks();
    }
  }
};

export default resolvers;
