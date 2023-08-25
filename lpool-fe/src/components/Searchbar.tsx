"use client";

import { useState } from "react";


interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
      <form onSubmit={handleSubmit} id="headerSearchBar">
          <input
              type="text"
              placeholder="Cerca..."
              value={query}
              onChange={handleInputChange}
          />
          <button type="submit">Cerca</button>
      </form>
  );
};

export default SearchBar;
