import { GetBook } from "../graphql/queries";

export function updateAddNewReviewToList(previousResult, subscriptionData) {
  if (!subscriptionData.data) {
    return previousResult;
  }
  const newReview = subscriptionData.data.reviewAdded;

  return {
    book: {
      ...previousResult.book,
      reviews: {
        __typename: previousResult.book.reviews.__typename,
        results: [newReview, ...previousResult.book.reviews.results],
        pageInfo: previousResult.book.reviews.pageInfo
      }
    }
  };
}

export function updateViewerHasInLibrary(cache, id) {
  const { book } = cache.readQuery({
    query: GetBook,
    variables: { id }
  });

  cache.writeQuery({
    query: GetBook,
    data: {
      book: {
        ...book,
        viewerHasInLibrary: !book.viewerHasInLibrary
      }
    }
  });
}
