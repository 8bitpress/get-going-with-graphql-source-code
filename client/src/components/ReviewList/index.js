import { useHistory } from "react-router-dom";
import dayjs from "dayjs";

import Button from "../../components/Button";

function ReviewsList({ bookId, reviews, viewerId }) {
  const history = useHistory();

  return reviews.map(({ createdAt, id, rating, reviewer, text }) => (
    <div className="pt-10" key={id}>
      <div className="sm:flex sm:justify-between mb-4 sm:mb-0">
        <div>
          <p>
            <span className="font-bold">
              {reviewer.name || reviewer.username}
            </span>{" "}
            {rating && `rated this book ${rating}/5`}
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Reviewed on {dayjs(createdAt).format("MMMM D, YYYY")}
          </p>
        </div>
        {viewerId === reviewer.id && (
          <div>
            <Button
              onClick={() => {
                history.push(`/book/${bookId}/review/${id}`);
              }}
              text="Update"
            />
          </div>
        )}
      </div>
      <p>{text}</p>
    </div>
  ));
}

export default ReviewsList;
