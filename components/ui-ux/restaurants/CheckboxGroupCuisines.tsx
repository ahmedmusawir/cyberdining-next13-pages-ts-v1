import {
  addCuisineId,
  removeCuisineId,
  // addCategoryTerm,
  // removeCategoryTerm,
  setCurrentPage,
} from "@/features/restaurants/restaurantFilterSlice";
import { GlobalState } from "@/global-entities";
import { useDispatch, useSelector } from "react-redux";

const CheckboxGroupCuisines = () => {
  const dispatch = useDispatch();

  const categoryTerms = useSelector(
    (state: GlobalState) => state.restaurantFilters.cuisineIds
  );

  // Values are ID-s in Strapi
  const cuisineOptions = [
    { value: "6", display: "Fast Food" },
    { value: "8", display: "Mexican" },
    { value: "4", display: "Chinese" },
    { value: "1", display: "Indian" },
  ];

  const handleCategorySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    dispatch(setCurrentPage(1));

    if (checked) {
      dispatch(addCuisineId(value)); // If checked, add the category term
    } else {
      dispatch(removeCuisineId(value)); // If unchecked, remove the category term
    }
  };

  return (
    <fieldset>
      <legend className="sr-only">Filter by Job Types</legend>
      <div className="space-y-3">
        {cuisineOptions.map((option) => (
          <div key={option.value} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id={option.display}
                aria-describedby="jobtype-checkbox-description"
                name="jobtype-checkbox"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={handleCategorySelect}
                checked={categoryTerms?.includes(option.value)}
                value={option.value}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor={option.display}
                className="text-xs font-semibold leading-6 text-gray-400"
              >
                {option.display}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxGroupCuisines;
