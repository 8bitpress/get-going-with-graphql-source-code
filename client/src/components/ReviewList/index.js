import dayjs from "dayjs";

function ReviewsList({ reviews }) {
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
      </div>
      <p>{text}</p>
    </div>
  ));
}

export default ReviewsList;
