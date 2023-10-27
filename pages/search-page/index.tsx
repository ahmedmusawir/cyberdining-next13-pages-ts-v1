import { Inter } from "next/font/google";
import { SearchPageContent, Template } from "@/components/page-view";

const inter = Inter({ subsets: ["latin"] });

export default function SearchPage() {
  return <SearchPageContent />;
}
