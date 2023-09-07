// import { useJobs } from "@/contexts/JobContext";

interface Bounds {
  [key: string]: number;
}

const CheckboxGroupSalary = () => {
  //   const { sideBarFormState, setSideBarFormState, setCurrentPage } = useJobs();

  const baseSalaryRangesOptions = [
    { value: "<20K", display: "Atlanta", bounds: { min: 0, max: 20000 } },
    {
      value: "20K-50K",
      display: "Alpharetta",
      bounds: { min: 20001, max: 50000 },
    },
    {
      value: "50K-100K",
      display: "Savanna",
      bounds: { min: 50001, max: 100000 },
    },
    {
      value: "> 100K",
      display: "Athens",
      bounds: { min: 100001, max: 1000000 },
    },
  ];

  const handleBaseSalaryRangesSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: string,
    bounds: Bounds
  ) => {
    // if (e.target.checked) {
    //   // Setting the current page number to 1
    //   setCurrentPage(1);
    //   // Updating Sidebar state after checking
    //   setSideBarFormState((prevState) => {
    //     const baseSalaryOptions = [...prevState.baseSalaryOptions];
    //     baseSalaryOptions.push(option);
    //     const baseSalaryBounds = [...prevState.baseSalaryBounds];
    //     baseSalaryBounds.push(bounds.min);
    //     baseSalaryBounds.push(bounds.max);
    //     const newFormState = {
    //       ...prevState,
    //       baseSalaryOptions,
    //       baseSalaryBounds,
    //     };
    //     return newFormState;
    //   });
    // } else {
    //   setSideBarFormState((prevState) => {
    //     // Putting Sidebar state back after un-checking
    //     const newFormState = {
    //       ...prevState,
    //       baseSalaryOptions: prevState.baseSalaryOptions.filter(
    //         (baseSalaryOption) => option != baseSalaryOption
    //       ),
    //       baseSalaryBounds: prevState.baseSalaryBounds.filter(
    //         (bound) => ![bounds.min, bounds.max].includes(bound)
    //       ),
    //     };
    //     // console.log(newFormState);
    //     return newFormState;
    //   });
    // }
  };

  return (
    <fieldset>
      <legend className="sr-only">Filter by Job Types</legend>
      <div className="space-y-3">
        {baseSalaryRangesOptions.map((option) => (
          <div key={option.value} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="jobtype-checkbox"
                aria-describedby="jobtype-checkbox-description"
                name="jobtype-checkbox"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={(e) =>
                  handleBaseSalaryRangesSelect(e, option.value, option.bounds)
                }
                // checked={sideBarFormState.baseSalaryOptions.includes(
                //   option.value
                // )}
                // value={option.value}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor="jobtype-checkbox"
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

export default CheckboxGroupSalary;
