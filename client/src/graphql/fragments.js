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
