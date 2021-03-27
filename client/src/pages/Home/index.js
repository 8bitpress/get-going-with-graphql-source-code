import { useQuery } from "@apollo/client";

import { GetViewerLibrary } from "../../graphql/queries";
import BookGrid from "../../components/BookGrid";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import PageNotice from "../../components/PageNotice";
import MainLayout from "../../components/MainLayout";

function Home() {
  const LIMIT = 12;
  const { data, error, fetchMore, loading } = useQuery(GetViewerLibrary, {
    variables: { limit: LIMIT, page: 1 }
  });

  let content;

  if (loading && !data) {
    content = <Loader centered />;
  } else if (data?.viewer && !data.viewer.library.results.length) {
    content = (
      <div className="flex flex-col h-full justify-center text-center">
        <p className="text-gray-500 text-2xl">
          Time to add some books to your library!
        </p>
      </div>
    );
  } else if (data?.viewer) {
    const {
      pageInfo: { hasNextPage, page },
      results
    } = data.viewer.library;

    content = (
      <>
        <div className="mb-8">
          <h2 className="font-medium mb-6 text-3xl">Your Library</h2>
          <BookGrid books={results} />
        </div>
        {hasNextPage && (
          <div className="flex justify-center">
            <Button
              text="Load More"
              onClick={() => {
                fetchMore({
                  variables: { limit: LIMIT, page: page + 1 }
                });
              }}
              type="button"
            />
          </div>
        )}
      </>
    );
  } else if (!data.viewer || error) {
    content = <PageNotice text="Book list is unavailable. Please try again." />;
  }

  return <MainLayout>{content}</MainLayout>;
}

export default Home;
