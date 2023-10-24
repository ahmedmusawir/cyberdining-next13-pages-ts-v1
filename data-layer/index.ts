import * as strapiPostAPI from "../data-layer/post";
import * as strapiRestaurantAPI from "../data-layer/restaurant";
import { PostDataSource } from "./post-entities";
import { RestaurantDataSource } from "./restaurant-entities";

interface DataSource extends PostDataSource, RestaurantDataSource {}

const datasource: DataSource = {
  ...strapiPostAPI,
  ...strapiRestaurantAPI,
};

export default datasource;
