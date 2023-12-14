import { useSelector, useDispatch } from "react-redux";
import { userRegisterSlice, verifyRegisterUserSlice } from "./modalSlice";

const useUserRegister = () => {
  const state = useSelector((state) => state.userRegister);
  const dispatch = useDispatch();

  return {
    isOpen: state.isOpen,
    onOpen: () => dispatch(userRegisterSlice.actions.openUserRegister()),
    onClose: () => dispatch(userRegisterSlice.actions.closeUserRegister()),
    onOpenVerifyRegisterUser: () => dispatch(verifyRegisterUserSlice.actions.openVerifyRegisterUser()),
    onCloseVerifyRegisterUser: () => dispatch(verifyRegisterUserSlice.actions.closeVerifyRegisterUser()),
  };
};

export default useUserRegister;
