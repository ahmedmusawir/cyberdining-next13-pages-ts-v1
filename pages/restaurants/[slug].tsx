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
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params!.slug as string;
  const restaurant = await datasource.getRestaurantBySlug(slug);

  console.log("Company Data: Static Props", restaurant);

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
    revalidate: 5,
  };
};

export default SingleRestaurantPage;
