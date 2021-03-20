import { gql } from "@apollo/client";

import { basicBook } from "./fragments";

export const GetBook = gql`
  query GetBook($id: ID!, $reviewsLimit: Int, $reviewsPage: Int) {
    book(id: $id) {
      ...basicBook
      summary
      reviews(
        limit: $reviewsLimit
        orderBy: REVIEWED_ON_DESC
        page: $reviewsPage
      ) {
        results {
          id
          book {
            id
          }
          reviewedOn
          rating
          reviewer {
            id
            name
            username
          }
          text
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
  ${basicBook}
`;

export const GetBooks = gql`
  query GetBooks($limit: Int, $page: Int) {
    books(limit: $limit, orderBy: TITLE_ASC, page: $page) {
      results {
        ...basicBook
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  ${basicBook}
`;

export const GetViewer = gql`
  query GetViewer {
    viewer {
      id
      email
      name
      username
    }
  }
`;

export const GetViewerLibrary = gql`
  query GetViewerLibrary($limit: Int, $page: Int) {
    viewer {
      id
      library(limit: $limit, orderBy: ADDED_ON_DESC, page: $page) {
        results {
          ...basicBook
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
  ${basicBook}
`;
