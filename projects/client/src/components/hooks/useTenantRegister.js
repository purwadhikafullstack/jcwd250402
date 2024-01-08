import { useSelector, useDispatch } from "react-redux";
import { tenantRegisterSlice } from "./modalSlice";

const useTenantRegister = () => {
  const state = useSelector((state) => state.tenantRegister);
  const dispatch = useDispatch();

  return {
    isOpen: state.isOpen,
    onOpen: () => dispatch(tenantRegisterSlice.actions.openTenantRegister()),
    onClose: () => dispatch(tenantRegisterSlice.actions.closeTenantRegister()),
  };
};

export default useTenantRegister;
