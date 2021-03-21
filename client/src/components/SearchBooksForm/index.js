import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import queryString from "query-string";

import Button from "../Button";
import TextInput from "../TextInput";

function SearchBooksForm() {
  const history = useHistory();
  const location = useLocation();

  const { q } = queryString.parse(location.search);
  const [query, setQuery] = useState(q || "");

  return (
    <div className="flex justify-center mb-4 w-full">
      <form
        className="flex flex-col sm:flex-row items-center justify-center max-w-xl w-full"
        onSubmit={event => {
          event.preventDefault();
          history.push(`/search?q=${query}`);
        }}
      >
        <TextInput
          className="flex-auto max-w-xs mb-4 sm:mb-0 sm:mr-2"
          hiddenLabel
          id="query"
          inputWidthClass="w-full"
          label="Search for a book title or author"
          name="query"
          onChange={event => {
            setQuery(event.target.value);
          }}
          placeholder="Search for a book title or author"
          type="search"
          value={query}
        />
        <Button primary text="Search" type="submit" />
      </form>
    </div>
  );
}

export default SearchBooksForm;
