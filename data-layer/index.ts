import * as strapiRestaurantAPI from "../data-layer/restaurant";
import * as strapiCuisineAPI from "../data-layer/cuisine";
import { CuisineDataSource } from "./cuisine-entities";
import { RestaurantDataSource } from "./restaurant-entities";

interface DataSource extends RestaurantDataSource, CuisineDataSource {}

const datasource: DataSource = {
  ...strapiRestaurantAPI,
  ...strapiCuisineAPI,
};

export default datasource;
