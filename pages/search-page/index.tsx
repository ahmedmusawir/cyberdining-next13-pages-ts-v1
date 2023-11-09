import SearchPageContent from "@/components/page-view/restaurants/SearchPageContent";
import { GetServerSideProps } from "next";

export default function SearchPage({ searchTerm }: { searchTerm: string }) {
  return <SearchPageContent searchTerm={searchTerm} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // context.params contains the dynamic parts of the URL.
  const { query } = context;
  const searchTerm = query.searchTerm as string; // Make sure to validate and sanitize the searchTerm

  // CONSIDER SANITIZING THE SEARCH TERM HERE ...

  return {
    props: {
      searchTerm,
    },
  };
};
