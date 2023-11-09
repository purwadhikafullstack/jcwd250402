import { useSelector, useDispatch } from "react-redux";
import { userRegisterSlice } from "./modalSlice";

const useUserRegister = () => {
  const state = useSelector((state) => state.userRegister);
  const dispatch = useDispatch();

  return {
    isOpen: state.isOpen,
    onOpen: () => dispatch(userRegisterSlice.actions.openUserRegister()),
    onClose: () => dispatch(userRegisterSlice.actions.closeUserRegister()),
  };
};

export default useUserRegister;
