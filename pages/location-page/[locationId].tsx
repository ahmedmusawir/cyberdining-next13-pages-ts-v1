import datasource from "@/data-layer";
import CuisinePageContent from "@/components/page-view/CuisinePageContent";
import { RestaurantApiResponse } from "@/services/restaurantService";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import LocationPageContent from "@/components/page-view/LocationPageContent";

interface Props {
  initialRestaurants: RestaurantApiResponse;
  locationId: string;
}
interface Params extends ParsedUrlQuery {
  locationId: string;
}

export default function CuisinePage({ initialRestaurants, locationId }: Props) {
  const router = useRouter();
  const locationName = router.query.locationName as string;

  return (
    <LocationPageContent
      initialRestaurants={initialRestaurants}
      locationId={locationId}
      locationName={locationName}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const locationIds = await datasource.getCuisineIds(); // Assuming this returns an array of numbers

  // Map the array of locationIds to an array of params objects
  const paths = locationIds.map((id) => ({
    params: { locationId: id.toString() },
  }));

  return {
    paths,
    fallback: "blocking", // or 'false' if you want to pre-render all paths at build time
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { params } = context;

  const locationId = params?.locationId;

  if (!locationId) {
    // Return a 404 error if locationId is not found
    return { notFound: true };
  }

  // Fetch data for the location using the locationId
  const restaurants: RestaurantApiResponse =
    await datasource.getAllRestaurantsByCuisineId(Number(locationId));

  return {
    props: {
      initialRestaurants: restaurants,
      locationId,
    },
    revalidate: 3600, // In seconds, so 3600 seconds = 1 hour
  };
};
