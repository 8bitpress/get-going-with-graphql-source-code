import { useQuery } from "@apollo/client";

import { GetBooks } from "../../graphql/queries";
import BookGrid from "../../components/BookGrid";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import MainLayout from "../../components/MainLayout";
import PageNotice from "../../components/PageNotice";
import SearchBooksForm from "../../components/SearchBooksForm";

function Index() {
  const limit = 12;
  const { data, error, fetchMore, loading } = useQuery(GetBooks, {
    variables: { limit, page: 1 }
  });

  let content = null;

  if (loading && !data) {
    content = <Loader centered />;
  } else if (data?.books) {
    const {
      pageInfo: { hasNextPage, page },
      results
    } = data.books;

    content = (
      <>
        <div className="mb-8">
          <SearchBooksForm />
          <BookGrid books={results} />
        </div>
        {hasNextPage && (
          <div className="flex justify-center">
            <Button
              onClick={() => {
                fetchMore({
                  variables: { limit, page: page + 1 }
                });
              }}
              text="Load More"
              type="button"
            />
          </div>
        )}
      </>
    );
  } else if (error) {
    content = <PageNotice text="Book list is unavailable. Please try again." />;
  }

  return <MainLayout>{content}</MainLayout>;
}

export default Index;
