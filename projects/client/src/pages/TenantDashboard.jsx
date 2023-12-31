import React, { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import PropertiesDashboard from "./PropertiesDashboard";
import { Sidebar, SidebarItem } from "../components";
import { GoGraph } from "react-icons/go";
import { PiWarehouseDuotone } from "react-icons/pi";
import { BsFlag } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdOutlineBedroomParent } from "react-icons/md";
import CreateProperty from "./CreateProperty";
import ReservationDashboard from "./ReservationsDashboard";
import RoomsDashboard from "./RoomsDashboard";
import CalendarDashboard from "./CalendarDashboard";
import Analytics from "./AnalyticsDashboard";

const TenantDashboard = ({ activeMenu }) => {
  const [activeMenuItem, setActiveMenuItem] = useState("Reservations");
  const [isExpanded, setIsExpanded] = useState(true);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const toggleSidebar = () => {
    setIsExpanded((current) => !current);
  };

  document.title = "Host Dashboard";
  return (
    <div
      className={`flex flex-row ${
        isExpanded ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
    >
      <div
        className={`fixed top-0 bottom-0 z-10 left-0 flex-none ${
          isExpanded ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
      >
        <Sidebar
          onMenuItemClick={handleMenuItemClick}
          isExpanded={isExpanded}
          toggleSidebar={toggleSidebar}
        >
          {/* <SidebarItem
            icon={<RxDashboard size={20} className="rotate-45" />}
            text="Dashboard"
            onMenuItemClick={handleMenuItemClick}
            active={activeMenuItem === "Dashboard"}
          /> */}
          <SidebarItem
            icon={<PiWarehouseDuotone size={20} />}
            text="Properties"
            onMenuItemClick={handleMenuItemClick}
            active={activeMenuItem === "Properties"}
          />
          <SidebarItem
            icon={<MdOutlineBedroomParent size={20} />}
            text="Rooms"
            onMenuItemClick={handleMenuItemClick}
            active={activeMenuItem === "Rooms"}
          />
          <SidebarItem
            icon={<BsFlag size={20} />}
            text="Reservations"
            onMenuItemClick={handleMenuItemClick}
            active={activeMenuItem === "Reservations"}
          />
          <SidebarItem
            icon={<AiOutlineCalendar size={20} />}
            text="Calendar"
            onMenuItemClick={handleMenuItemClick}
            active={activeMenuItem === "Calendar"}
          />
          {/* <SidebarItem
            icon={<MdStarHalf size={20} />}
            text="Review"
            onMenuItemClick={handleMenuItemClick}
            active={activeMenuItem === "Review"}
          /> */}
          <SidebarItem
            icon={<GoGraph size={20} />}
            text="Analytics"
            onMenuItemClick={handleMenuItemClick}
            active={activeMenuItem === "Analytics"}
          />
        </Sidebar>
      </div>
      <div
        className={` ${
          isExpanded
            ? "w-full lg:ml-[290px] p-4 z-0 overlay"
            : "w-full ml-32 lg:ml-[110px] p-4"
        } relative`}
      >
        {activeMenuItem === "editProfile" ? <UpdateProfile /> : null}
        {/* {activeMenuItem === "Dashboard" ? <Dashboard /> : null} */}
        {activeMenuItem === "Properties" ? <PropertiesDashboard /> : null}
        {activeMenuItem === "CreateProperty" ? <CreateProperty /> : null}
        {activeMenuItem === "Reservations" ? <ReservationDashboard /> : null}
        {activeMenuItem === "Rooms" ? <RoomsDashboard /> : null}
        {activeMenuItem === "Calendar" ? <CalendarDashboard /> : null}
        {activeMenuItem === "Analytics" ? <Analytics /> : null}
      </div>
    </div>
  );
};

export default TenantDashboard;
