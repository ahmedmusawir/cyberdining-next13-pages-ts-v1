import { RestaurantSinglePageContent } from "@/components/page-view";
import datasource from "@/data-layer";
import { RestaurantData } from "@/data-layer/restaurant-entities";
import { GetStaticPropsContext } from "next";

interface Props {
  restaurant: RestaurantData;
}

const SingleRestaurantPage = ({ restaurant }: Props) => {
  return <RestaurantSinglePageContent restaurant={restaurant} />;
};

export const getStaticPaths = async () => {
  const slugs = await datasource.getRestaurantSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  // console.log("PATHS IN STATIC PATHS IN /restaurants/[slug].tsx", paths);
  return {
    paths,
    fallback: true,
    // fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params!.slug as string;
  const restaurant = await datasource.getRestaurantBySlug(slug);

  console.log("Restaurant Data: Static Props", restaurant.attributes.name);

  if (!restaurant) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      restaurant,
    },
    revalidate: 3600, // In seconds, so 3600 seconds = 1 hour
  };
};

export default SingleRestaurantPage;
