import SearchPageContent from "@/components/page-view/restaurants/SearchPageContent";
import datasource from "@/data-layer";
import { RestaurantApiResponse } from "@/services/restaurantService";
import { GetServerSideProps } from "next";

export default function SearchPage({ searchTerm }: { searchTerm: string }) {
  return <SearchPageContent searchTerm={searchTerm} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // context.params contains the dynamic parts of the URL.
  const { query } = context;
  const searchTerm = query.searchTerm as string; // Make sure to validate and sanitize the searchTerm

  // Call your API function using the searchTerm
  // const searchResults = await datasource.getAllRestaurantsBySearchTerm(
  //   searchTerm
  // );

  return {
    props: {
      searchTerm,
      // searchResults,
    },
  };
};
