import fetch from "node-fetch";
import moment from "moment";
import { StringifyOptions } from "querystring";

export const getExcerpt = (content: string, wordLimit = 20) => {
  const words = content.split(/\s+/); // Split by whitespace
  return (
    words.slice(0, wordLimit).join(" ") +
    (words.length > wordLimit ? "..." : "")
  );
};

export const formatDate = (strapiDate: string) => {
  // const strapiDate = "2023-10-02T11:17:15.676Z";
  const formattedDate = moment(strapiDate).format("MMM D, YYYY");

  // console.log(formattedDate); // Outputs: "Oct 2, 2023"
  return formattedDate;
};

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

export const generateSearchFields = (searchTerm: string): SearchField[] => {
  const searchFields: SearchField[] = [];
  const fields = [
    "title",
    "content",
    "slug",
    "categories.name",
    "post_tags.name",
  ];

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

const BASE_URL = "http://127.0.0.1:1337/api";

export const qsToStrapi = async (endpoint: string) => {
  const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

  console.log("api key", STRAPI_API_KEY);

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
