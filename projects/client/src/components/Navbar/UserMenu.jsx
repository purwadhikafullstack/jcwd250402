import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { AiOutlineMenu } from "react-icons/ai";
import useLoginModal from "../hooks/useLoginModal.js";
import useTenantRegister from "../hooks/useTenantRegister.js";
import useUserRegister from "../hooks/useUserRegister.js";

const UserMenu = () => {
  const loginModal = useLoginModal();
  const navigate = useNavigate();
  const tenantRegister = useTenantRegister();
  const userRegister = useUserRegister();
  const [showMenu, setShowMenu] = useState(false);

  const logOutHandler = () => {
    if (localStorage.getItem("token") === null) {
      toast.error("You are not logged in");
      return;
    }
    localStorage.removeItem("token");
    toast.success("Successfully logged out! We'll miss you :(");
    navigate("/");
  };

  const toggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={tenantRegister.onOpen}
          className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
        >
          Become a Host
        </div>
        <div
          onClick={toggleMenu}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm bg-white">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={loginModal.onOpen} label="Login" />
              <MenuItem onClick={userRegister.onOpen} label="Register" />
              <MenuItem onClick={logOutHandler} label="Log Out" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
