import { gql } from "@apollo/client";

export const basicBook = gql`
  fragment basicBook on Book {
    authors {
      id
      name
    }
    cover
    id
    title
  }
`;

export const fullReview = gql`
  fragment fullReview on Review {
    id
    book {
      id
    }
    reviewedOn
    rating
    reviewer {
      id
      name
    }
    text
  }
`;

export const viewerAndToken = gql`
  fragment viewerAndToken on AuthPayload {
    viewer {
      id
      email
      name
      username
    }
    token
  }
`;
