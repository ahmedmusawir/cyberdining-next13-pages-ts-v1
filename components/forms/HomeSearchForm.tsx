import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";

const HomeSearchForm = () => {
  const [homeSearchTerm, setHomeSearchTerm] = useState("");
  const router = useRouter();

  const navigateToSearch = () => {
    if (homeSearchTerm.trim()) {
      router.push(
        `/search-page?searchTerm=${encodeURIComponent(homeSearchTerm)}`
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigateToSearch();
    }
  };

  const handleClick = () => {
    navigateToSearch();
  };

  return (
    <div className="mt-10 items-center gap-x-6">
      <div className="relative mt-2 rounded-md shadow-sm flex-grow">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-[0.5rem] pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="City or Restaurant or Cuisine"
          value={homeSearchTerm}
          onChange={(e) => setHomeSearchTerm(e.target.value)}
          onKeyUp={handleKeyPress}
        />
      </div>
      <button
        type="button"
        className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
        onClick={handleClick}
      >
        Let's go
      </button>
    </div>
  );
};

export default HomeSearchForm;
