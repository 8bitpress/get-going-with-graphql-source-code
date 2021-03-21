import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import queryString from "query-string";

import { SearchBooks } from "../../graphql/queries";
import BookGrid from "../../components/BookGrid";
import Loader from "../../components/Loader";
import MainLayout from "../../components/MainLayout";
import PageNotice from "../../components/PageNotice";
import SearchBooksForm from "../../components/SearchBooksForm";

function Search() {
  const location = useLocation();
  const { q } = queryString.parse(location.search);

  const { data, error, loading } = useQuery(SearchBooks, {
    variables: { query: q }
  });

  let content;

  if (loading) {
    content = <Loader centered />;
  } else if (data?.searchBooks) {
    const parsedBooks = data.searchBooks.reduce((acc, curr) => {
      if (curr.__typename === "Author") {
        return acc.concat(curr.books);
      }
      acc.push(curr);
      return acc;
    }, []);

    content = (
      <div className="mb-8">
        <SearchBooksForm />
        {parsedBooks.length ? (
          <BookGrid books={parsedBooks} />
        ) : (
          <p className="mt-8 text-center">
            No books found! Please search again.
          </p>
        )}
      </div>
    );
  } else if (error) {
    content = (
      <PageNotice text="Book search is unavailable. Please try again." />
    );
  }

  return <MainLayout>{content}</MainLayout>;
}

export default Search;
