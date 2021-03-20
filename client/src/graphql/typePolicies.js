const typePolicies = {
  Query: {
    fields: {
      books: {
        keyArgs: false,
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
      }
    }
  }
};

export default typePolicies;
