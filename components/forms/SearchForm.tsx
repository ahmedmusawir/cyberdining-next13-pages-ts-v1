import {
  setCurrentPage,
  setSearchTerm,
} from "@/features/restaurants/restaurantFilterSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SearchForm = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(""); // Local state for input value

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update the local state
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === "Enter") {
      dispatch(setCurrentPage(1));

      dispatch(setSearchTerm(inputValue)); // Use the local state value
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
  };

  return (
    <form className="relative flex flex-1" onSubmit={handleSubmit}>
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
        aria-hidden="true"
      />
      <input
        id="search-field"
        className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
        placeholder="Search..."
        type="search"
        name="search"
        // value={searchFormState}
        onChange={(e) => handleSearch(e)}
        onKeyUp={handleKeyPress}
      />
    </form>
  );
};

export default SearchForm;
