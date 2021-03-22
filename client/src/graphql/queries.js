import { gql } from "@apollo/client";

import { basicBook, fullReview } from "./fragments";

export const GetBook = gql`
  query GetBook($id: ID!, $reviewsLimit: Int, $reviewsPage: Int) {
    book(id: $id) {
      ...basicBook
      summary
      viewerHasInLibrary
      viewerHasReviewed
      reviews(
        limit: $reviewsLimit
        orderBy: REVIEWED_ON_DESC
        page: $reviewsPage
      ) {
        results {
          ...fullReview
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
  ${basicBook}
  ${fullReview}
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

export const GetReview = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      id
      rating
      text
    }
  }
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

export const SearchBooks = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query, orderBy: RESULT_ASC) {
      ... on Book {
        ...basicBook
      }
      ... on Author {
        books {
          ...basicBook
        }
      }
    }
  }
  ${basicBook}
`;
