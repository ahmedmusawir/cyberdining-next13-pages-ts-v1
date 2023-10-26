import { CuisineApiResponse } from "@/services/cuisineService";
import { RestaurantData } from "./restaurant-entities";

export interface CuisineDataSource {
  getAllRestaurantsByCuisine: (
    cuisineId: number
  ) => Promise<CuisineApiResponse>;
}

export interface CuisineData {
  id: number;
  attributes: Cuisine;
}

export interface Cuisine {
  name: string;
  createdAt: string;
  updatedAt: string;
  restaurants: {
    data: RestaurantData[];
  };
}
