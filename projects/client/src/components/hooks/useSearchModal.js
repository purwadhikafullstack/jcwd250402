import { useSelector, useDispatch } from "react-redux";
import { searchModalSlice } from "./modalSlice";

const useSearchModal = () => {
  const state = useSelector((state) => state.searchModal);
  const dispatch = useDispatch();

  return {
    isOpen: state.isOpen,
    onOpen: () => dispatch(searchModalSlice.actions.openSearchModal()),
    onClose: () => dispatch(searchModalSlice.actions.closeSearchModal()),
  };
};

export default useSearchModal;
