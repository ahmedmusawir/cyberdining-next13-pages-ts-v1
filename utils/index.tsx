import moment from "moment";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"; // Make sure to import the icon from the correct library

// PROCESSING COMMA SEPERATED STRINGS INTO ARRAY FOR $in STRAPI FILTER
export const convertStringToArray = (
  queryData: string | string[]
): string[] => {
  let dataArray: string[] = [];

  if (queryData) {
    if (typeof queryData === "string") {
      dataArray = (queryData as string).split(","); // Convert comma-separated string to array
    } else {
      dataArray = queryData as string[];
    }
  }

  return dataArray;
};

// LIMITING POST EXCERPT SIZE
export const getExcerpt = (content: string, wordLimit = 20) => {
  const words = content.split(/\s+/); // Split by whitespace
  return (
    words.slice(0, wordLimit).join(" ") +
    (words.length > wordLimit ? "..." : "")
  );
};

// DATE FORMATTER
export const formatDate = (strapiDate: string) => {
  // const strapiDate = "2023-10-02T11:17:15.676Z";
  const formattedDate = moment(strapiDate).format("MMM D, YYYY");

  // console.log(formattedDate); // Outputs: "Oct 2, 2023"
  return formattedDate;
};

// PROCESSING SEARCH FIELDS FOR STRAPI API
type BasicFilter = {
  $containsi?: string;
  $eq?: boolean | string;
  $in?: string[];
  $gte?: number;
  $lte?: number;
};

type SearchField = {
  [key: string]: string | BasicFilter | NestedSearchField;
};

type NestedSearchField = {
  [key: string]: BasicFilter;
};

export const generateSearchFields = (
  searchTerm: string,
  fields: string[]
): SearchField[] => {
  const searchFields: SearchField[] = [];

  fields.forEach((field) => {
    if (!field.includes(".")) {
      searchFields.push({ [field]: { $containsi: searchTerm } });
    } else {
      const [level1, level2] = field.split(".");
      const nestedSearchField: NestedSearchField = {
        [level2]: { $containsi: searchTerm },
      };
      searchFields.push({ [level1]: nestedSearchField });
    }
  });

  return searchFields;
};

// FOR GENERETING PRICE $$$ ICONS IN
// components/list-view/RestaurantList.tsx
export const generatePriceIcons = (price: string) => {
  switch (price) {
    case "EXPENSIVE":
      return (
        <span className="text-xs flex">
          <CurrencyDollarIcon className="w-5" />
          <CurrencyDollarIcon className="w-5" />
          <CurrencyDollarIcon className="w-5" />
          {/* <span className="mt-[.4rem] ml-1">Price</span> */}
        </span>
      );
    case "REGULAR":
      return (
        <span className="text-xs flex">
          <CurrencyDollarIcon className="w-5" />
          <CurrencyDollarIcon className="w-5" />
          {/* <span className="mt-[.4rem] ml-1">Price</span> */}
        </span>
      );
    case "CHEAP":
      return (
        <span className="text-xs flex">
          <CurrencyDollarIcon className="w-5" />
          {/* <span className="mt-[.4rem] ml-1">Price</span> */}
        </span>
      );
    default:
      return null; // Return null for the default case, which won't render anything
  }
};

// FUNCTION FOR TESTING STRAPI QUERY VIA NEXT API (LOCAL)
// Location: /pages/api/qs-strapi.ts
const BASE_URL = "http://127.0.0.1:1337/api";

export const qsToStrapi = async (endpoint: string) => {
  const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

  // console.log("api key", STRAPI_API_KEY);

  const headers = {
    Authorization: `Bearer ${STRAPI_API_KEY}`,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: headers,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error((data as any)?.error?.message || "An error occurred");
  }

  return await response.json();
};
