import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

import { CreateReview, UpdateReview } from "../../graphql/mutations";
import { GetReview } from "../../graphql/queries";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import MainLayout from "../../components/MainLayout";
import PageNotice from "../../components/PageNotice";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";

function ReviewBook() {
  const { bookId, reviewId } = useParams();
  const { viewer, error: viewerError } = useAuth();
  const history = useHistory();

  const [rating, setRating] = useState("5");
  const [text, setText] = useState("");

  const { loading, error } = useQuery(GetReview, {
    variables: { id: reviewId },
    skip: !reviewId || !viewer,
    onCompleted: data => {
      if (data?.review) {
        setRating(data.review.rating);
        setText(data.review.text);
      }
    }
  });

  const [createReview] = useMutation(CreateReview, {
    onCompleted: () => {
      history.push(`/book/${bookId}`);
    }
  });
  const [updateReview] = useMutation(UpdateReview, {
    onCompleted: () => {
      history.push(`/book/${bookId}`);
    }
  });

  const handleSubmit = event => {
    event.preventDefault();

    if (reviewId) {
      updateReview({
        variables: {
          input: {
            id: reviewId,
            rating: parseInt(rating),
            text
          }
        }
      }).catch(err => {
        console.error(err);
      });
    } else {
      createReview({
        variables: {
          input: {
            bookId,
            rating: parseInt(rating),
            reviewerId: viewer.id,
            text
          }
        }
      }).catch(err => {
        console.error(err);
      });
    }
  };

  let content = null;

  if (loading) {
    content = <Loader centered />;
  } else if (viewer) {
    content = (
      <div className="bg-white p-8 shadow-xl">
        <h2 className="mb-8">
          {reviewId ? "Update Review" : "Create a New Review"}
        </h2>
        <form onSubmit={handleSubmit}>
          <Select
            className="mb-6"
            id="rating"
            label="Rating"
            name="rating"
            onChange={event => {
              setRating(event.target.value);
            }}
            options={[
              { text: "1", value: "1" },
              { text: "2", value: "2" },
              { text: "3", value: "3" },
              { text: "4", value: "4" },
              { text: "5", value: "5" }
            ]}
            value={rating}
          />
          <TextInput
            className="mb-6 w-full"
            id="text"
            inputWidthClass="w-full"
            label="Your Review"
            name="text"
            onChange={event => {
              setText(event.target.value);
            }}
            placeholder="Write a brief review of the book"
            value={text}
          />
          <Button className="mt-4" primary text="Submit" type="submit" />
        </form>
      </div>
    );
  } else if (error || viewerError) {
    content = <PageNotice text="Something went wrong. Please try again!" />;
  }

  return <MainLayout>{content}</MainLayout>;
}

export default ReviewBook;
