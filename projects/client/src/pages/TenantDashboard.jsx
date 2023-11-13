import React, { useState } from "react";
import { TenantSidebar } from "../components";
import UpdateProfile from "./UpdateProfile";

const TenantDashboard = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  document.title = "Host Dashboard";
  return (
    <div className="flex flex-row">
      <div className="fixed top-0 bottom-0 left-0 flex-none">
        <TenantSidebar onMenuItemClick={handleMenuItemClick} />
      </div>
      <div className="w-full ml-[290px]">
        {activeMenuItem === "ProfileSetting" ? <UpdateProfile /> : null}
      </div>
    </div>
  );
};

export default TenantDashboard;
