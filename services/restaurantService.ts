import HttpService, { ApiResponse } from "./httpService";
import { RestaurantData } from "@/data-layer/restaurant-entities";

export type RestaurantApiResponse = ApiResponse<RestaurantData>;

const restaurantService = new HttpService<RestaurantData>("/restaurants");

export default restaurantService;
