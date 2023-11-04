import { CuisineApiResponse } from "@/services/cuisineService";
import { RestaurantData } from "./restaurant-entities";

export interface CuisineDataSource {
  getAllRestaurantsByCuisine: (
    cuisineId: number
  ) => Promise<CuisineApiResponse>;

  getCuisineIds: () => Promise<number[]>;
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
