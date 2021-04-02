import { gql } from "@apollo/client";

import { fullReview } from "./fragments";

export const ReviewAdded = gql`
  subscription ReviewAdded($bookId: ID!) {
    reviewAdded(bookId: $bookId) {
      ...fullReview
    }
  }
  ${fullReview}
`;
