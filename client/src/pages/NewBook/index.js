import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useState } from "react";

import { CreateBookAndAuthors } from "../../graphql/mutations";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import MainLayout from "../../components/MainLayout";
import PageNotice from "../../components/PageNotice";
import Select from "../../components/Select";
import TextInput from "../../components/TextInput";

function NewBook() {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [cover, setCover] = useState("");
  const [genre, setGenre] = useState("");
  const [summary, setSummary] = useState("");
  const [titleError, setTitleError] = useState();

  const { viewer, error: viewerError } = useAuth();
  const history = useHistory();

  const [createBookAndAuthors, { error: mutationError }] = useMutation(
    CreateBookAndAuthors,
    {
      onCompleted: ({ createBookAndAuthors: { id } }) => {
        history.push(`/book/${id}`);
      }
    }
  );

  const handleSubmitBook = async event => {
    event.preventDefault();
    setTitleError(null);

    if (!title) {
      setTitleError("This field is required");
      return;
    }

    createBookAndAuthors({
      variables: {
        input: {
          authorNames: authors ? authors.split(/\s*,\s*/) : [],
          title,
          ...(cover && { cover }),
          ...(genre && { genre }),
          ...(summary && { summary })
        }
      }
    }).catch(err => {
      console.error(err);
    });
  };

  let content = null;

  if (viewer) {
    content = (
      <div className="bg-white p-8 shadow-xl">
        <h2 className="mb-8">Create a New Book</h2>
        <form onSubmit={handleSubmitBook}>
          <TextInput
            className="mb-6 w-full sm:w-3/5 md:w-1/2"
            error={titleError}
            id="title"
            inputWidthClass="w-full"
            label="Title *"
            name="title"
            onChange={event => {
              setTitle(event.target.value);
            }}
            placeholder="Enter the book's title"
            value={title}
          />
          <TextInput
            className="mb-6 w-full sm:w-3/5 md:w-1/2"
            id="cover"
            inputWidthClass="w-full"
            label="Cover Image URL"
            name="cover"
            onChange={event => {
              setCover(event.target.value);
            }}
            placeholder="Provide an URL for the book's cover image"
            value={cover}
          />
          <TextInput
            className="mb-6 w-full sm:w-3/5 md:w-1/2"
            id="author"
            inputWidthClass="w-full"
            label="Author (separate multiple authors with commas)"
            name="author"
            onChange={event => {
              setAuthors(event.target.value);
            }}
            placeholder="Enter the author's full name"
            value={authors}
          />
          <TextInput
            className="mb-6 w-full sm:w-3/5 md:w-1/2"
            id="summary"
            inputWidthClass="w-full"
            label="Summary"
            name="summary"
            onChange={event => {
              setSummary(event.target.value);
            }}
            placeholder="Provide a short summary of the book's content"
            value={summary}
          />
          <Select
            className="mb-6 w-full sm:w-3/5 md:w-1/2"
            label="Genre"
            onChange={event => {
              setGenre(event.target.value);
            }}
            options={[
              { text: "Choose one...", value: "" },
              { text: "Adventure", value: "ADVENTURE" },
              { text: "Children", value: "CHILDREN" },
              { text: "Classics", value: "CLASSICS" },
              {
                text: "Comic Book / Graphic Novel",
                value: "COMIC_GRAPHIC_NOVEL"
              },
              {
                text: "Detective / Mystery",
                value: "DETECTIVE_MYSTERY"
              },
              { text: "Dystopia", value: "DYSTOPIA" },
              { text: "Fantasy", value: "FANTASY" },
              { text: "Horror", value: "HORROR" },
              { text: "Humor", value: "HUMOR" },
              { text: "Non-Fiction", value: "NON_FICTION" },
              {
                text: "Science Fiction",
                value: "SCIENCE_FICTION"
              },
              { text: "Romance", value: "ROMANCE" },
              { text: "Thriller", value: "THRILLER" },
              { text: "Western", value: "WESTERN" }
            ]}
            selectWidthClass="w-full sm:w-3/4"
            value={genre}
          />
          <div className="flex items-center">
            <Button className="mr-2 mt-4" primary text="Submit" type="submit" />
          </div>
        </form>
      </div>
    );
  } else if (mutationError || viewerError) {
    content = <PageNotice text="Something went wrong. Please try again!" />;
  }

  return <MainLayout>{content}</MainLayout>;
}

export default NewBook;
