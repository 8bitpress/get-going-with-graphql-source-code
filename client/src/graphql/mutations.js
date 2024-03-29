import { gql } from "@apollo/client";

import { fullReview, viewerAndToken } from "./fragments";

export const AddBooksToLibrary = gql`
  mutation AddBooksToLibrary($input: UpdateLibraryBooksInput!) {
    addBooksToLibrary(input: $input) {
      id
    }
  }
`;

export const CreateBookAndAuthors = gql`
  mutation CreateBookAndAuthors($input: CreateBookAndAuthorsInput!) {
    createBookAndAuthors(input: $input) {
      id
      authors {
        name
      }
      cover
      genre
      title
    }
  }
`;

export const CreateReview = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      ...fullReview
    }
  }
  ${fullReview}
`;

export const DeleteReview = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
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

export const UpdateReview = gql`
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      ...fullReview
    }
  }
  ${fullReview}
`;
