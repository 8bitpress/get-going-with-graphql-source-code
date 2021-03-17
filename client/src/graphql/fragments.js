import { gql } from "@apollo/client";

export const gridBook = gql`
  fragment gridBook on Book {
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
