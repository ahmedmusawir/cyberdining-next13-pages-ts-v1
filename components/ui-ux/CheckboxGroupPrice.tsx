import {
  addLocationId,
  addPrice,
  removeLocationId,
  removePrice,
  setCurrentPage,
} from "@/features/restaurants/restaurantFilterSlice";
import { GlobalState } from "@/global-entities";
import { useDispatch, useSelector } from "react-redux";

const CheckboxGroupPrice = () => {
  const dispatch = useDispatch();

  const priceTerms = useSelector(
    (state: GlobalState) => state.restaurantFilters.prices
  );
  console.log("Prices in form", priceTerms);

  const priceOptions = [
    { value: "CHEAP", display: "Below $30 ($)" },
    {
      value: "REGULAR",
      display: "Below $60 ($$)",
    },
    {
      value: "EXPENSIVE",
      display: "$60 Plus ($$$)",
    },
  ];

  const handlePostTagsSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    dispatch(setCurrentPage(1));

    if (checked) {
      dispatch(addPrice(value)); // If checked, add the postTags term
    } else {
      dispatch(removePrice(value)); // If unchecked, remove the postTags term
    }
  };

  return (
    <fieldset>
      <legend className="sr-only">Filter by Price</legend>
      <div className="space-y-3">
        {priceOptions.map((option) => (
          <div key={option.value} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id={option.value}
                aria-describedby="jobtype-checkbox-description"
                name="jobtype-checkbox"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={handlePostTagsSelect}
                checked={priceTerms?.includes(option.value)}
                value={option.value}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor={option.value}
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

export default CheckboxGroupPrice;
