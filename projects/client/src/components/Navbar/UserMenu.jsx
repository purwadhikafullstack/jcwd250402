import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { jwtDecode } from "jwt-decode";
import { AiOutlineMenu } from "react-icons/ai";
import useLoginModal from "../hooks/useLoginModal.js";
import useTenantRegister from "../hooks/useTenantRegister.js";
import useUserRegister from "../hooks/useUserRegister.js";
import { logout, isTenantLogout } from "../slice/authSlices.js";
import { useDispatch } from "react-redux";

const UserMenu = () => {
  const dispatch = useDispatch();
  const loginModal = useLoginModal();
  const navigate = useNavigate();
  const tenantRegister = useTenantRegister();
  const userRegister = useUserRegister();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTenant, setIsTenant] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userIsLoggedIn);
    if (userIsLoggedIn) {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      console.log(userRole);
      if (userRole === "tenant") {
        setIsTenant(true);
      } else if (userRole === "user") {
        setIsUser(true);
      }
    }
  }, []);

  const logOutHandler = () => {
    if (!isLoggedIn) {
      toast.error("You are not logged in");
      loginModal.onOpen();
      return;
    }
    dispatch(logout());
    toast.success("Successfully logged out! We'll miss you :(");
    window.location.reload();
  };

  const toggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {isUser ||
          (!isLoggedIn && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/tenant");
              }}
              className="px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
            >
              Become a Host
            </div>
          ))}
        {isTenant && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate("/tenant/dashboard");
            }}
            className="px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
          >
            Tenant Dashboard
          </div>
        )}
        <div
          onClick={toggleMenu}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar height={40} width={40} />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm bg-white">
          <div className="flex flex-col cursor-pointer">
            {!isLoggedIn && (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={userRegister.onOpen} label="Register" />
              </>
            )}
            {isLoggedIn && (
              <>
                <MenuItem onClick={logOutHandler} label="Log Out" />
                <MenuItem onClick={logOutHandler} label="Edit Profile" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
