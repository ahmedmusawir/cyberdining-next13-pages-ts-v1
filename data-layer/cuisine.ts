import cuisineService, { CuisineApiResponse } from "@/services/cuisineService";
import qs from "qs";

// GETS ALL RESTAURANTS BY CUISINE ID
export const getAllRestaurantsByCuisine = async (
  cuisineId: number
): Promise<CuisineApiResponse> => {
  const query = qs.stringify(
    {
      fields: ["name"],
      filters: {
        id: {
          $eq: cuisineId,
        },
      },
      populate: {
        restaurants: {
          populate: "*",
        },
      },
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    }
  );

  const response = await cuisineService.getAll(query);

  return response;
};

// GETS ONLY ALL CUISINE ID-S AS AN ARRAY OF NUMBERS
export const getCuisineIds = async (): Promise<number[]> => {
  const query = qs.stringify({ fields: ["id"] }, { encodeValuesOnly: true });

  const response = await cuisineService.getAll(query);

  const ids = response.data.map((cuisine) => cuisine.id);

  return ids;
};
