import { ShowAllPageContent } from "@/components/page-view";
import datasource from "@/data-layer";
import { RestaurantApiResponse } from "@/services/restaurantService";

export default function RestaurantsPage({
  initialRestaurants,
}: {
  initialRestaurants: RestaurantApiResponse;
}) {
  return <ShowAllPageContent initialRestaurants={initialRestaurants} />;
}

export const getStaticProps = async () => {
  const restaurants: RestaurantApiResponse =
    await datasource.getAllRestaurants();

  const restData = restaurants.data; // This will be of type RestaurantData[].
  const restMeta = restaurants.meta; // This will be of type { pagination: Pagination }.

  // console.log("Restaurants:", restData);
  // console.log("Restaurants Meta:", restMeta);

  // Can destructure data and meta properties:
  // const { data, meta } = jobs;

  return {
    props: {
      initialRestaurants: restaurants,
    },
    revalidate: 5,
  };
};
