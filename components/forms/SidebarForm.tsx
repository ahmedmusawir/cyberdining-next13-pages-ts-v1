import React from "react";
import SwitchButtonFeatured from "../ui-ux/SwitchButtonFeatured";
import SwitchButtonOnlineOrdering from "../ui-ux/SwitchButtonOnlineOrdering";
import CheckboxGroupCuisines from "../ui-ux/restaurants/CheckboxGroupCuisines";
import CheckboxGroupLocations from "../ui-ux/restaurants/CheckboxGroupLocations";
import CheckboxGroupPrice from "../ui-ux/restaurants/CheckboxGroupPrice";
import { useRouter } from "next/router";

const SidebarForm = () => {
  const router = useRouter();
  // Checking if it is the Cuisine Page
  const isCuisinePage = router.pathname === "/cuisine-page/[cuisineId]";

  // Checking if it is the Locations Page
  const isLocationPage = router.pathname === "/location-page/[locationId]";

  return (
    <div>
      <div className="text-sm font-semibold leading-6 text-gray-400 pb-5">
        Filter Results
      </div>
      <SwitchButtonFeatured labelText="Featured Only" filter="featured" />
      <SwitchButtonOnlineOrdering labelText="Order Online" filter="featured" />
      {!isCuisinePage && (
        <>
          <div className="text-sm font-semibold leading-6 text-gray-400 py-5">
            Cuisines
          </div>
          <CheckboxGroupCuisines />
        </>
      )}
      {!isLocationPage && (
        <>
          <div className="text-sm font-semibold leading-6 text-gray-400 py-5">
            Locations
          </div>
          <CheckboxGroupLocations />
        </>
      )}
      <div className="text-sm font-semibold leading-6 text-gray-400 py-5">
        Price (Table for 2)
      </div>
      <CheckboxGroupPrice />
    </div>
  );
};

export default SidebarForm;
