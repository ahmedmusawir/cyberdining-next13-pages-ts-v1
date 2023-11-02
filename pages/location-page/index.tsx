import LocationPageContent from "@/components/page-view/LocationPageContent";
import { useRouter } from "next/router";

export default function SearchPage() {
  const { query } = useRouter();
  const locationId = query.locationId as string;

  return <LocationPageContent locationId={locationId} />;
}
