import React, { FormEvent, useState } from "react";
import "./SearchBox.scss";

type Props = {
  onInput: (input: string) => void;
  defaultQuery: string;
};

function SearchBox({ onInput, defaultQuery }: Props) {
  const [query, setQuery] = useState(defaultQuery);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onInput(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        onInput={handleChange}
        defaultValue={defaultQuery}
        placeholder="Search"
        pattern="[A-Za-z]{0,64}"
      />
    </form>
  );
}

export default SearchBox;
