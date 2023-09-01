import { useJobs } from "@/contexts/JobContext";
import { JobApiResponse } from "@/services/jobService";
import {
  sortJobsByBaseAnnualSalary,
  sortJobsByCompanyName,
  // sortJobsByCompanyName,
  sortJobsByDatePosted,
} from "@/utils";
import { useState } from "react";

const JobSortForm = () => {
  const { jobs, setDisplayedJobs, setCurrentPage } = useJobs();
  const [sortby, setSortby] = useState("date-posted");

  // console.log("Jobs in JobSortForm", jobs.data);

  const options = [
    { value: "nothing", display: "Sort By" },
    { value: "company", display: "Company" },
    { value: "date-posted-asc", display: "Date Posted ASC" },
    { value: "date-posted-desc", display: "Date Posted DESC" },
    { value: "salary-asc", display: "Salary ASC" },
    { value: "salary-desc", display: "Salary DESC" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    // Setting the current page number to 1
    setCurrentPage(1);

    const newSortby = e.target.value;
    // console.log("Sort Text:", newSortby);

    if (newSortby === "date-posted-asc") {
      const sortedJobsData = sortJobsByDatePosted({
        // jobs: jobs.data,
        jobs,
        ASC: true,
      });
      setDisplayedJobs((prevState) => ({
        ...prevState,
        data: sortedJobsData,
      }));
    }

    if (newSortby === "date-posted-desc") {
      const sortedJobsData = sortJobsByDatePosted({ jobs, ASC: false });
      setDisplayedJobs((prevState) => ({
        ...prevState,
        data: sortedJobsData,
      }));
    }

    if (newSortby === "salary-asc") {
      const sortedJobs = sortJobsByBaseAnnualSalary({ jobs, ASC: true });
      setDisplayedJobs((prevState) => ({
        ...prevState,
        data: sortedJobs,
      }));
    }
    if (newSortby === "salary-desc") {
      const sortedJobs = sortJobsByBaseAnnualSalary({ jobs, ASC: false });
      setDisplayedJobs((prevState) => ({
        ...prevState,
        data: sortedJobs,
      }));
    }

    if (newSortby === "company") {
      const sortedJobs = sortJobsByCompanyName({ jobs });
      setDisplayedJobs((prevState) => ({
        ...prevState,
        data: sortedJobs,
      }));
    }
    setSortby(newSortby);
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

export default JobSortForm;
