import { useQuery } from "@apollo/client";

import { GetBooks } from "../../graphql/queries";
import BookGrid from "../../components/BookGrid";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import MainLayout from "../../components/MainLayout";
import PageNotice from "../../components/PageNotice";

function Index() {
  const { data, error, loading } = useQuery(GetBooks, {
    variables: { limit: 12, page: 1 }
  });

  let content;

  if (loading) {
    content = <Loader centered />;
  } else if (data?.books) {
    const {
      pageInfo: { hasNextPage },
      results
    } = data.books;

    content = (
      <>
        <div className="mb-8">
          <BookGrid books={results} />
        </div>
        {hasNextPage && (
          <div className="flex justify-center">
            <Button text="Load More" type="button" />
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
