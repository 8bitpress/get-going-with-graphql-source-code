import { gql } from "@apollo/client";

import { gridBook } from "./fragments";

export const GetBooks = gql`
  query GetBooks($limit: Int, $page: Int) {
    books(limit: $limit, orderBy: TITLE_ASC, page: $page) {
      results {
        ...gridBook
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  ${gridBook}
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
          ...gridBook
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
  ${gridBook}
`;
