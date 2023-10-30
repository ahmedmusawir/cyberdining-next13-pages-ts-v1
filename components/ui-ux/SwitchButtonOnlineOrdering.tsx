import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useDispatch } from "react-redux";
import {
  setCurrentPage,
  toggleHasOnlineOrdering,
  toggleIsFeatured,
} from "@/features/restaurants/restaurantFilterSlice";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SwitchProps {
  labelText: string;
  filter: string;
}

const SwitchButtonOnlineOrdering = ({ labelText, filter }: SwitchProps) => {
  const [enabled, setEnabled] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (checked: boolean) => {
    setEnabled(checked);
    dispatch(setCurrentPage(1));

    dispatch(toggleHasOnlineOrdering()); // Dispatch the action to update the Redux state
  };

  return (
    <Switch.Group as="div" className="flex items-center mb-5">
      <Switch
        checked={enabled}
        onChange={handleChange}
        className={classNames(
          enabled ? "bg-indigo-600" : "bg-gray-400",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="text-xs font-semibold leading-6 text-gray-400">
          {labelText}
        </span>{" "}
        {/* <span className="text-gray-500">(Save 10%)</span> */}
      </Switch.Label>
    </Switch.Group>
  );
};

export default SwitchButtonOnlineOrdering;
