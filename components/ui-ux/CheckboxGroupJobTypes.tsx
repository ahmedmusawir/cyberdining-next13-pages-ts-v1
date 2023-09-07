// import { useJobs } from "@/contexts/JobContext";

const CheckboxGroupJobTypes = () => {
  //   const { sideBarFormState, setSideBarFormState, setCurrentPage } = useJobs();

  const jobTypesOptions = [
    { value: "asian", display: "Asian" },
    { value: "fine-dining", display: "Fine Dining" },
    { value: "fastfood", display: "Fastfood" },
    { value: "bar-lounge", display: "Bar/Lounge" },
    { value: "mexican", display: "Mexican" },
  ];

  const handleJobTypeSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: string
  ) => {
    // if (e.target.checked) {
    //   // Setting the current page number to 1
    //   setCurrentPage(1);
    //   // Updating Sidebar state after checking
    //   setSideBarFormState((prevState) => {
    //     const jobTypes = [...prevState.jobTypes];
    //     jobTypes.push(option);
    //     return { ...prevState, jobTypes };
    //   });
    // } else {
    //   setSideBarFormState((prevState) => {
    //     // Putting Sidebar state back after un-checking
    //     return {
    //       ...prevState,
    //       jobTypes: prevState.jobTypes.filter((jobType) => option != jobType),
    //     };
    //   });
    // }
  };

  return (
    <fieldset>
      <legend className="sr-only">Filter by Job Types</legend>
      <div className="space-y-3">
        {jobTypesOptions.map((option) => (
          <div key={option.value} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="jobtype-checkbox"
                aria-describedby="jobtype-checkbox-description"
                name="jobtype-checkbox"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={(e) => handleJobTypeSelect(e, option.value)}
                // checked={sideBarFormState.jobTypes.includes(option.value)}
                value={option.value}
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

export default CheckboxGroupJobTypes;
