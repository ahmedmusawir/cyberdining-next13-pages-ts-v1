import { setSortNameOrder } from "@/features/restaurants/restaurantFilterSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";

const NameSortForm = () => {
  const dispatch = useDispatch();

  const options = [
    { value: "nothing", display: "Sort By" },
    { value: "asc", display: "Names (A to Z)" },
    { value: "desc", display: "Names (Z to A)" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch(setSortNameOrder(e.target.value));
  };

  return (
    <div>
      <select
        id="sorting"
        name="sorting"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue="Sort By"
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NameSortForm;
