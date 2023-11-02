import React from "react";
import SwitchButtonFeatured from "../ui-ux/SwitchButtonFeatured";
import SwitchButtonOnlineOrdering from "../ui-ux/SwitchButtonOnlineOrdering";
import CheckboxGroupCuisines from "../ui-ux/restaurants/CheckboxGroupCuisines";
import CheckboxGroupLocations from "../ui-ux/restaurants/CheckboxGroupLocations";
import CheckboxGroupPrice from "../ui-ux/restaurants/CheckboxGroupPrice";

const SidebarForm = () => {
  return (
    <div>
      <div className="text-sm font-semibold leading-6 text-gray-400 pb-5">
        Filter Results
      </div>
      <SwitchButtonFeatured labelText="Featured Only" filter="featured" />
      <SwitchButtonOnlineOrdering labelText="Order Online" filter="featured" />
      <div className="text-sm font-semibold leading-6 text-gray-400 py-5">
        Cuisines
      </div>
      <CheckboxGroupCuisines />
      <div className="text-sm font-semibold leading-6 text-gray-400 py-5">
        Locations
      </div>
      <CheckboxGroupLocations />
      <div className="text-sm font-semibold leading-6 text-gray-400 py-5">
        Price (Table for 2)
      </div>
      <CheckboxGroupPrice />
    </div>
  );
};

export default SidebarForm;
