import React from "react";
import useUserRegister from "../hooks/useUserRegister";
import useLoginModal from "../hooks/useLoginModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./UserRegister";

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
