import React from "react";
import RegisterModal from "./UserRegister";
import useUserRegister from "../hooks/useUserRegister";
import useLoginModal from "../hooks/useLoginModal";
import LoginModal from "./LoginModal";

const AuthModal = () => {
  const userRegister = useUserRegister();
  const userLogin = useLoginModal();
  return (
    <>
      {userRegister.isOpen && <RegisterModal />}
      {userLogin.isOpen && <LoginModal />}
    </>
  );
};

export default AuthModal;
