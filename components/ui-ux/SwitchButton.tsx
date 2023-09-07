import { useState } from "react";
import { Switch } from "@headlessui/react";
// import { useJobs } from "@/contexts/JobContext";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SwitchProps {
  labelText: string;
  filter: string;
}

const SwitchButton = ({ labelText, filter }: SwitchProps) => {
  const [enabled, setEnabled] = useState(false);
  //   const { sideBarFormState, setSideBarFormState, setCurrentPage } = useJobs();

  // console.log('Prev State:', sideBarFormState);

  const handleChange = (checked: boolean) => {
    setEnabled(checked);
    // setCurrentPage(1);

    // switch (filter) {
    //   case "remoteOk":
    //     console.log("Remote Switch Checked:", checked);
    //     setSideBarFormState((prevState) => {
    //       return { ...prevState, remoteOk: checked };
    //     });
    //     break;

    //   case "featured":
    //     console.log("Featured Switch Checked:", checked);
    //     setSideBarFormState((prevState) => {
    //       return {
    //         ...prevState,
    //         featured: !prevState.featured,
    //       };
    //     });
    //     break;

    //   default:
    //     break;
    // }
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

export default SwitchButton;
