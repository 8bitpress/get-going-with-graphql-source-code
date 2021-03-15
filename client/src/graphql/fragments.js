import { gql } from "@apollo/client";

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
