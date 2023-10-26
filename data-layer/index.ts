import * as strapiPostAPI from "../data-layer/post";
import * as strapiRestaurantAPI from "../data-layer/restaurant";
import * as strapiCuisineAPI from "../data-layer/cuisine";
import { CuisineDataSource } from "./cuisine-entities";
import { PostDataSource } from "./post-entities";
import { RestaurantDataSource } from "./restaurant-entities";

interface DataSource
  extends PostDataSource,
    RestaurantDataSource,
    CuisineDataSource {}

const datasource: DataSource = {
  ...strapiPostAPI,
  ...strapiRestaurantAPI,
  ...strapiCuisineAPI,
};

export default datasource;
