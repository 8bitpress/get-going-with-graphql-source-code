import { gql } from "@apollo/client";

import { viewerAndToken } from "./fragments";

export const AddBooksToLibrary = gql`
  mutation AddBooksToLibrary($input: UpdateLibraryBooksInput!) {
    addBooksToLibrary(input: $input) {
      id
    }
  }
`;

export const Login = gql`
  mutation Login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      ...viewerAndToken
    }
  }
  ${viewerAndToken}
`;

export const Logout = gql`
  mutation Logout {
    logout
  }
`;

export const RemoveBooksFromLibrary = gql`
  mutation RemoveBooksFromLibrary($input: UpdateLibraryBooksInput!) {
    removeBooksFromLibrary(input: $input) {
      id
    }
  }
`;

export const SignUp = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      ...viewerAndToken
    }
  }
  ${viewerAndToken}
`;
