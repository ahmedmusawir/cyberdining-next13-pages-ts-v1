import {
  addLocationId,
  removeLocationId,
  setCurrentPage,
} from "@/features/restaurants/restaurantFilterSlice";
import { GlobalState } from "@/global-entities";
import { useDispatch, useSelector } from "react-redux";

const CheckboxGroupPostTags = () => {
  const dispatch = useDispatch();

  const postTagTerms = useSelector(
    (state: GlobalState) => state.restaurantFilters.locationIds
  );
  // The values are id-s in Strapi
  const locationOptions = [
    { value: "1", display: "Atlanta" },
    {
      value: "3",
      display: "Marietta",
    },
    {
      value: "5",
      display: "Alpharetta",
    },
  ];

  const handlePostTagsSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    dispatch(setCurrentPage(1));

    if (checked) {
      dispatch(addLocationId(value)); // If checked, add the postTags term
    } else {
      dispatch(removeLocationId(value)); // If unchecked, remove the postTags term
    }
  };

  return (
    <fieldset>
      <legend className="sr-only">Filter by Post Tags</legend>
      <div className="space-y-3">
        {locationOptions.map((option) => (
          <div key={option.value} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id={option.value}
                aria-describedby="jobtype-checkbox-description"
                name="jobtype-checkbox"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={handlePostTagsSelect}
                checked={postTagTerms?.includes(option.value)}
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

export default CheckboxGroupPostTags;
