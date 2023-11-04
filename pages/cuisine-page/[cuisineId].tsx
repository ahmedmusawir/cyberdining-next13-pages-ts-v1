import datasource from "@/data-layer";
import CuisinePageContent from "@/components/page-view/CuisinePageContent";
import { RestaurantApiResponse } from "@/services/restaurantService";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

interface Props {
  initialRestaurants: RestaurantApiResponse;
  cuisineId: string;
}
interface Params extends ParsedUrlQuery {
  cuisineId: string;
}

export default function CuisinePage({ initialRestaurants, cuisineId }: Props) {
  const router = useRouter();
  const cuisineName = router.query.cuisineName as string;

  return (
    <CuisinePageContent
      initialRestaurants={initialRestaurants}
      cuisineId={cuisineId}
      cuisineName={cuisineName}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cuisineIds = await datasource.getCuisineIds(); // Assuming this returns an array of numbers

  // Map the array of cuisineIds to an array of params objects
  const paths = cuisineIds.map((id) => ({
    params: { cuisineId: id.toString() },
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

  const cuisineId = params?.cuisineId;

  if (!cuisineId) {
    // Return a 404 error if cuisineId is not found
    return { notFound: true };
  }

  // Fetch data for the cuisine using the cuisineId
  const restaurants: RestaurantApiResponse =
    await datasource.getAllRestaurantsByCuisineId(Number(cuisineId));

  return {
    props: {
      initialRestaurants: restaurants,
      cuisineId,
    },
    revalidate: 3600, // In seconds, so 3600 seconds = 1 hour
  };
};
