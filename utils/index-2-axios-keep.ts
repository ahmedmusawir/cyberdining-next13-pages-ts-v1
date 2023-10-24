import axios from "axios";

const BASE_URL = "http://127.0.0.1:1337/api"; //IP is a must in Mac... localhost won't work!

export const qsToStrapi = async (endpoint: string) => {
  const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

  console.log("api key", STRAPI_API_KEY);

  const headers = {
    Authorization: `Bearer ${STRAPI_API_KEY}`,
  };

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: headers,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        error.response.data?.error?.message || "An error occurred"
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
};
