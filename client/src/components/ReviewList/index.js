import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import dayjs from "dayjs";

import { DeleteReview } from "../../graphql/mutations";
import Button from "../../components/Button";

function ReviewsList({ bookId, reviews, viewerId }) {
  const history = useHistory();

  const [deleteReview] = useMutation(DeleteReview, {
    update: (cache, { data: { deleteReview } }) => {
      cache.modify({
        id: `Book:${bookId}`,
        fields: {
          reviews(existingReviewRefs, { readField }) {
            return existingReviewRefs.results.filter(
              reviewRef => deleteReview !== readField("id", reviewRef)
            );
          }
        }
      });
      cache.evict({ id: `Review:${deleteReview}` });
    }
  });

  return reviews.map(({ id, rating, reviewedOn, reviewer, text }) => (
    <div className="pt-10" key={id}>
      <div className="sm:flex sm:justify-between mb-4 sm:mb-0">
        <div>
          <p>
            <span className="font-bold">
              {reviewer.name}
            </span>{" "}
            {rating && `rated this book ${rating}/5`}
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Reviewed on {dayjs(reviewedOn).format("MMMM D, YYYY")}
          </p>
        </div>
        {viewerId === reviewer.id && (
          <div>
            <Button
              className="block"
              onClick={() => {
                history.push(`/book/${bookId}/review/${id}`);
              }}
              text="Update"
            />
            <button
              className="block m-auto mt-1 text-sm text-gray-600 hover:text-red-600"
              onClick={() => {
                deleteReview({ variables: { id } }).catch(err => {
                  console.log(err);
                });
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <p>{text}</p>
    </div>
  ));
}

export default ReviewsList;
