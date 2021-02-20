import fetch from "node-fetch";

const baseUrl = "http://localhost:5000";

const resolvers = {
  Author: {
    async books(author, args, context, info) {
      const res = await fetch(`${baseUrl}/authors/${author.id}/books`);
      const items = await res.json();
      return items.map(item => item.book);
    }
  },
  Book: {
    async authors(book, args, context, info) {
      const res = await fetch(`${baseUrl}/books/${book.id}/authors`);
      const items = await res.json();
      return items.map(item => item.author);
    }
  },
  Query: {
    async author(root, { id }, context, info) {
      const res = await fetch(`${baseUrl}/authors/${id}`);
      return res.json();
    },
    async authors(root, args, context, info) {
      const res = await fetch(`${baseUrl}/authors`);
      return res.json();
    },
    async book(root, { id }, context, info) {
      const res = await fetch(`${baseUrl}/books/${id}`);
      return res.json();
    },
    async books(root, args, context, info) {
      const res = await fetch(`${baseUrl}/books`);
      return res.json();
    }
  }
};

export default resolvers;
