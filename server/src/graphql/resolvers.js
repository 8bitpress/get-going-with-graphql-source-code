import { PubSub, withFilter } from "graphql-subscriptions";

import DateTimeType from "./scalars/DateTimeType.js";
import RatingType from "./scalars/RatingType.js";

const pubsub = new PubSub();
const REVIEW_ADDED = "REVIEW_ADDED";

const resolvers = {
  // SCALARS

  DateTime: DateTimeType,

  Rating: RatingType,

  // ENUMS

  AuthorOrderBy: {
    NAME_ASC: "name_asc",
    NAME_DESC: "name_desc"
  },
  BookOrderBy: {
    TITLE_ASC: "title_asc",
    TITLE_DESC: "title_desc"
  },
  LibraryOrderBy: {
    ADDED_ON_ASC: "createdAt_asc",
    ADDED_ON_DESC: "createdAt_desc"
  },
  ReviewOrderBy: {
    REVIEWED_ON_ASC: "createdAt_asc",
    REVIEWED_ON_DESC: "createdAt_desc"
  },

  // INTERFACES

  Person: {
    __resolveType(obj, context, info) {
      if (obj.username) {
        return "User";
      } else {
        return "Author";
      }
    }
  },

  // UNIONS

  BookResult: {
    __resolveType(obj, context, info) {
      if (obj.title) {
        return "Book";
      } else {
        return "Author";
      }
    }
  },

  // OBJECTS

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
      return dataSources.jsonServerApi.getBookReviews(book.id, args);
    },
    viewerHasInLibrary(book, args, { dataSources, user }, info) {
      return user?.sub
        ? dataSources.jsonServerApi.checkViewerHasInLibrary(user.sub, book.id)
        : null;
    },
    viewerHasReviewed(book, args, { dataSources, user }, info) {
      return user?.sub
        ? dataSources.jsonServerApi.checkViewerHasReviewed(user.sub, book.id)
        : null;
    }
  },
  Review: {
    book(review, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookById(review.bookId);
    },
    reviewedOn(review, args, { dataSources }, info) {
      return review.createdAt;
    },
    reviewer(review, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserById(review.userId);
    }
  },
  User: {
    library(user, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserLibrary(user.id, args);
    },
    reviews(user, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserReviews(user.id, args);
    }
  },

  // ROOT

  Query: {
    author(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthorById(id);
    },
    authors(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthors(args);
    },
    book(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookById(id);
    },
    books(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBooks(args);
    },
    review(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getReviewById(id);
    },
    searchBooks(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.searchBooks(args);
    },
    searchPeople(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.searchPeople(args);
    },
    user(root, { username }, { dataSources }, info) {
      return dataSources.jsonServerApi.getUser(username);
    },
    viewer(root, args, { dataSources, user }, info) {
      if (user?.username) {
        return dataSources.jsonServerApi.getUser(user.username);
      }
      return null;
    }
  },
  Mutation: {
    addBooksToLibrary(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.addBooksToLibrary(input);
    },
    createAuthor(root, { name }, { dataSources }, info) {
      return dataSources.jsonServerApi.createAuthor(name);
    },
    createBook(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.createBook(input);
    },
    createBookAndAuthors(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.createBookAndAuthors(input);
    },
    async createReview(root, { input }, { dataSources }, info) {
      const review = await dataSources.jsonServerApi.createReview(input);
      pubsub.publish(REVIEW_ADDED, { reviewAdded: review });
      return review;
    },
    deleteReview(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.deleteReview(id);
    },
    login(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.login(args);
    },
    logout(root, args, context, info) {
      return true;
    },
    removeBooksFromLibrary(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.removeBooksFromLibrary(input);
    },
    signUp(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.signUp(input);
    },
    updateReview(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.updateReview(input);
    }
  },
  Subscription: {
    reviewAdded: {
      subscribe: withFilter(
        (root, args, context, info) => {
          return pubsub.asyncIterator([REVIEW_ADDED]);
        },
        (payload, variables, context, info) => {
          return payload.reviewAdded.bookId === parseInt(variables.bookId);
        }
      )
    }
  }
};

export default resolvers;
