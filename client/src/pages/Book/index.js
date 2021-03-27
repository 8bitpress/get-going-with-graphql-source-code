import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import {
  AddBooksToLibrary,
  RemoveBooksFromLibrary
} from "../../graphql/mutations";
import { GetBook } from "../../graphql/queries";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import MainLayout from "../../components/MainLayout";
import PageNotice from "../../components/PageNotice";
import ReviewsList from "../../components/ReviewList";

function Book() {
  const { id } = useParams();
  const { viewer } = useAuth();
  const history = useHistory();
  const REVIEW_LIMIT = 20;

  const { data, error, fetchMore, loading } = useQuery(GetBook, {
    variables: { id, reviewsLimit: REVIEW_LIMIT, reviewsPage: 1 },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first"
  });
  const [addBooksToLibrary] = useMutation(AddBooksToLibrary, {
    update: cache => {
      updateViewerHasInLibrary(cache, id);
    }
  });
  const [removeBooksFromLibrary] = useMutation(RemoveBooksFromLibrary, {
    update: cache => {
      updateViewerHasInLibrary(cache, id);
    }
  });

  let content;

  if (loading && !data) {
    content = <Loader centered />;
  } else if (data?.book) {
    const {
      book: {
        authors,
        cover,
        reviews,
        summary,
        title,
        viewerHasInLibrary,
        viewerHasReviewed
      }
    } = data;

    content = (
      <div className="bg-white p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between border-b border-gray-300 border-solid pb-8">
          {cover ? (
            <img
              className="mb-4 sm:mb-0 w-40 sm:w-1/4 sm:order-2"
              src={cover}
              alt={`${title} cover`}
            />
          ) : (
            <div className="bg-gray-200 flex flex-none justify-center items-center mb-4 sm:mb-0 py-4 w-40 sm:w-1/4 sm:order-2">
              <span className="italic px-8 py-20 md:py-24 lg:py-32 text-center text-gray-600">
                Cover image unavailable
              </span>
            </div>
          )}
          <div className="sm:mr-8 sm:order-1 text-center sm:text-left">
            <h2>{title}</h2>
            <p className="leading-tight my-4 text-gray-600 text-lg">{`by ${authors
              .map(author => author.name)
              .join(", ")}`}</p>
            {summary ? (
              <p className="mb-4">{summary}</p>
            ) : (
              <p className="mb-4 italic text-gray-400">
                Book summary unavailable.
              </p>
            )}
            {viewer && (
              <Button
                className="mt-4"
                onClick={() => {
                  const variables = {
                    input: { bookIds: [id], userId: viewer.id }
                  };

                  if (viewerHasInLibrary) {
                    removeBooksFromLibrary({ variables });
                  } else {
                    addBooksToLibrary({ variables });
                  }
                }}
                text={
                  viewerHasInLibrary ? "Remove from Library" : "Add to Library"
                }
              />
            )}
          </div>
        </div>
        <div className="mt-8">
          <div className="sm:flex sm:justify-between">
            <h3 className="mb-4 sm:mb-0">What Readers Say</h3>
            {viewer && !viewerHasReviewed && (
              <Button
                onClick={() => {
                  history.push(`/book/${id}/review/new`);
                }}
                primary
                text="Add a Review"
              />
            )}
          </div>
          {reviews.results.length ? (
            <div>
              <ReviewsList
                bookId={id}
                reviews={reviews.results}
                viewerId={viewer?.id || null}
              />
              {reviews.pageInfo.hasNextPage && (
                <Button
                  className="mt-4"
                  onClick={() => {
                    fetchMore({
                      variables: {
                        reviewsLimit: REVIEW_LIMIT,
                        reviewsPage: reviews.pageInfo.page + 1
                      }
                    });
                  }}
                  text="Load More"
                  type="button"
                />
              )}
            </div>
          ) : (
            <p className="italic mt-4">No reviews for this book yet!</p>
          )}
        </div>
      </div>
    );
  } else if (error) {
    content = <PageNotice text="Book not found!" />;
  }

  return <MainLayout>{content}</MainLayout>;
}

function updateViewerHasInLibrary(cache, id) {
  const { book } = cache.readQuery({
    query: GetBook,
    variables: { id }
  });

  cache.writeQuery({
    query: GetBook,
    data: {
      book: {
        ...book,
        viewerHasInLibrary: !book.viewerHasInLibrary
      }
    }
  });
}

export default Book;
