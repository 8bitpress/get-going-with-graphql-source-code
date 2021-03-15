import { gql } from "@apollo/client";

export const GetBooks = gql`
  query GetBooks($limit: Int, $page: Int) {
    books(limit: $limit, orderBy: TITLE_ASC, page: $page) {
      results {
        authors {
          id
          name
        }
        cover
        id
        title
      }
      pageInfo {
        hasPrevPage
        hasNextPage
      }
    }
  }
`;
