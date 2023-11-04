import { resetAll } from "@/features/restaurants/restaurantFilterSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export const useResetHandler = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleReset = () => {
    // console.log("Cuisine Page: ", router.pathname);
    // Check if the current path is one of the predetermined source paths
    const isSourcePath = [
      "/search-page",
      "/location-page/[locationId]",
      "/cuisine-page/[cuisineId]",
    ].includes(router.pathname);

    if (isSourcePath) {
      // If on one of the source paths, redirect to "/restaurants"
      router.push("/restaurants");
      dispatch(resetAll());
    } else {
      // Otherwise, dispatch the resetAll action
      dispatch(resetAll());
    }
  };

  return handleReset;
};
