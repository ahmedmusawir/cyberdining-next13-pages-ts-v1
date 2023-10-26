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
