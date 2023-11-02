import { SearchPageContent } from "@/components/page-view";
import CuisinePageContent from "@/components/page-view/CuisinePageContent";
import datasource from "@/data-layer";
import { RestaurantApiResponse } from "@/services/restaurantService";
import { GetServerSideProps } from "next";

interface Props {
  initialRestaurants: RestaurantApiResponse;
  cuisineId: string;
}

export default function RestaurantsPage({
  initialRestaurants,
  cuisineId,
}: Props) {
  return (
    <CuisinePageContent
      initialRestaurants={initialRestaurants}
      cuisineId={cuisineId}
    />
  );
}

interface Params {
  params: {
    cuisineId: string;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  // params contains the cuisineId
  const cuisineIdString = params.cuisineId;
  const cuisineId = Number(cuisineIdString);

  // Fetch data for the location using the cuisineId
  const restaurants: RestaurantApiResponse =
    await datasource.getAllRestaurantsByLocationId(cuisineId);

  return {
    props: {
      initialRestaurants: restaurants,
      cuisineId: cuisineId,
    },
    revalidate: 5,
  };
};
