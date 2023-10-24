import fetch from "node-fetch";

const BASE_URL = "http://localhost:1337/api";

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
