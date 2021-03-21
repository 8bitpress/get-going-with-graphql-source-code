function mergePageResults(keyArgs = false) {
  return {
    keyArgs,
    merge(existing, incoming, { args: { page, limit } }) {
      const { __typeName, pageInfo, results } = incoming;
      const mergedResults = existing?.results.length
        ? existing.results.slice(0)
        : [];

      for (let i = 0; i < results.length; ++i) {
        mergedResults[(page - 1) * limit + i] = results[i];
      }
      return { results: mergedResults, pageInfo, __typeName };
    }
  };
}

const typePolicies = {
  Book: {
    fields: {
      reviews: mergePageResults()
    }
  },
  User: {
    fields: {
      library: mergePageResults()
    }
  },
  Query: {
    fields: {
      books: mergePageResults()
    }
  }
};

export default typePolicies;
