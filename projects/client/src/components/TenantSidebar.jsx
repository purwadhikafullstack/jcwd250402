import React, { useEffect, useState } from "react";
import { MdLogout, MdStarHalf } from "react-icons/md";
import { GoGear, GoGraph } from "react-icons/go";
import { PiWarehouseDuotone } from "react-icons/pi";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsFlag } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import UserAvatar from "./Avatar";
import logo from "../asset/Logo-Black.svg";
import api from "../api";
import { toast } from "sonner";
import { UpdateProfile } from "../pages";

const CashierSideBar = ({ onMenuItemClick }) => {
  const [fullname, setFullname] = useState("");
  const logoutHandler = () => {
    localStorage.removeItem("token");

    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.href = "/";
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/user/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const { fullname } = response.data.userInfo;
          setFullname(fullname);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [token]);

  return (
    <div className="flex bg-white shadow-md">
      <div className="flex flex-col justify-between h-screen p-5 pt-8 border-r-2 border-gray-300 w-72 ">
        <div>
          <div
            className="cursor-pointer"
            onClick={() => onMenuItemClick("ProfileSetting")}
          >
            <div className="flex flex-row items-center justify-center p-4 border-2 border-gray-400 rounded-lg hover:border-primary">
              <div className="justify-between ">
                <UserAvatar height={80} width={80} />
              </div>
              <div className="flex flex-col">
                <span className="ml-3">{fullname}</span>
                <span className="ml-3 text-xs text-neutral-400">
                  Edit Profile
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <ul>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-primary text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
                // onClick={() => onMenuItemClick("dashboard")}
                onClick={() =>
                  toast.success("Test Custom Color", {
                    style: {
                      background: "#FFF",
                      color: "#0256EE",
                    },
                  })
                }
              >
                <RxDashboard className="h-[30px] w-[30px] rotate-45" />
                <span className="hidden p-2 rounded-md md:block">
                  Dashboard
                </span>
              </li>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-primary text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
                // onClick={() => onMenuItemClick("properties")}
                onClick={() => toast.success("Test Custom Color")}
              >
                <PiWarehouseDuotone className="h-[30px] w-[30px]" />
                <span className="hidden p-2 rounded-md md:block">
                  Properties
                </span>
              </li>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-primary text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
                onClick={() => onMenuItemClick("reservations")}
              >
                <BsFlag className="h-[30px] w-[30px]" />
                <span className="hidden p-2 rounded-md md:block">
                  Reservations
                </span>
              </li>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-primary text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
                onClick={() => onMenuItemClick("calendar")}
              >
                <AiOutlineCalendar className="h-[30px] w-[30px]" />
                <span className="hidden p-2 rounded-md md:block">Calendar</span>
              </li>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-primary text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
                onClick={() => onMenuItemClick("review")}
              >
                <MdStarHalf className="h-[30px] w-[30px]" />
                <span className="hidden p-2 rounded-md md:block">Review</span>
              </li>
              <li
                onClick={() => onMenuItemClick("analytics")}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-primary text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
              >
                <GoGraph className="h-[30px] w-[30px]" />
                <span className="hidden p-2 rounded-md md:block">
                  Analytics
                </span>
              </li>
              <li
                onClick={logoutHandler}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-primary text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
              >
                <MdLogout className="h-[30px] w-[30px]" />
                <span className="hidden p-2 rounded-md md:block">Logout</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <a href="/dashboard">
            <img
              src={logo}
              alt="logo"
              className="cursor-pointer ml-[25px]"
              width={120}
              height={120}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CashierSideBar;
