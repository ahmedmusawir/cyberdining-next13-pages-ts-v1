import React from "react";
import SwitchButton from "../ui-ux/SwitchButton";
import CheckboxGroupJobTypes from "../ui-ux/CheckboxGroupJobTypes";
import CheckboxGroupSalary from "../ui-ux/CheckboxGroupSalary";

const SidebarForm = () => {
  return (
    <div>
      <div className="text-sm font-semibold leading-6 text-gray-400 pb-5">
        Filter Results
      </div>
      {/* <SwitchButton labelText="Remote Only" filter="remoteOk" /> */}
      <SwitchButton labelText="Featured Only" filter="featured" />
      <div className="text-sm font-semibold leading-6 text-gray-400 py-5">
        Cuisines
      </div>
      <CheckboxGroupJobTypes />
      <div className="text-sm font-semibold leading-6 text-gray-400 py-5">
        Locations
      </div>
      <CheckboxGroupSalary />
    </div>
  );
};

export default SidebarForm;
