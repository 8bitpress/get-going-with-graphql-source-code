import { useHistory, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";

import { CreateReview } from "../../graphql/mutations";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import MainLayout from "../../components/MainLayout";
import PageNotice from "../../components/PageNotice";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";

function ReviewBook() {
  const { bookId } = useParams();
  const { viewer, error: viewerError } = useAuth();
  const history = useHistory();

  const [rating, setRating] = useState("5");
  const [text, setText] = useState("");

  const [createReview] = useMutation(CreateReview, {
    onCompleted: () => {
      history.push(`/book/${bookId}`);
    }
  });

  const handleSubmit = event => {
    event.preventDefault();

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
  };

  let content;

  if (viewer) {
    content = (
      <div className="bg-white p-8 shadow-xl">
        <h2 className="mb-8">Create a New Review</h2>
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
  } else if (viewerError) {
    content = <PageNotice text="Something went wrong. Please try again!" />;
  }

  return <MainLayout>{content}</MainLayout>;
}

export default ReviewBook;
