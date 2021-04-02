import { and, rule, shield } from "graphql-shield";

const isAuthenticated = rule()((parent, args, { user }, info) => {
  return user !== null;
});

const isUpdatingOwnLibrary = rule()(
  (root, { input: { userId } }, { user }, info) => {
    return user?.sub === userId;
  }
);

const isEditingOwnReview = rule()(
  async (root, args, { dataSources, user }, info) => {
    const id = args.input ? args.input.id : args.id;
    const review = await dataSources.jsonServerApi.getReviewById(id);
    return user.sub === review.userId.toString();
  }
);

const permissions = shield(
  {
    Query: {
      searchPeople: isAuthenticated,
      user: isAuthenticated
    },
    Mutation: {
      addBooksToLibrary: and(isAuthenticated, isUpdatingOwnLibrary),
      createAuthor: isAuthenticated,
      createBook: isAuthenticated,
      createReview: isAuthenticated,
      deleteReview: and(isAuthenticated, isEditingOwnReview),
      removeBooksFromLibrary: and(isAuthenticated, isUpdatingOwnLibrary),
      updateReview: and(isAuthenticated, isEditingOwnReview)
    }
  },
  { debug: process.env.NODE_ENV === "development" }
);

export default permissions;
