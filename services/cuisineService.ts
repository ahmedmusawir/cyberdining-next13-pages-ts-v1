import { CuisineData } from "@/data-layer/cuisine-entities";
import HttpService, { ApiResponse } from "./httpService";

export type CuisineApiResponse = ApiResponse<CuisineData>;

const cuisineService = new HttpService<CuisineData>("/cuisines");

export default cuisineService;
