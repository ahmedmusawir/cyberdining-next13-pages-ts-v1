import React from "react";
import SidebarNav from "./SidebarNav";

const SidebarDesktop = () => {
  return (
    <>
      <div className="hidden lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"> */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 bg-gradient-to-r from-indigo-50 to-white">
          {/* DESKTOP SIDEBAR NAVIGATION */}
          <SidebarNav />
        </div>
      </div>
    </>
  );
};

export default SidebarDesktop;
