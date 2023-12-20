import { useSelector, useDispatch } from "react-redux";
import { reviewModalSlice } from "./modalSlice";

const useSearchModal = () => {
  const state = useSelector((state) => state.searchModal);
  const dispatch = useDispatch();

  return {
    isOpen: state.isOpen,
    onOpen: () => dispatch(reviewModalSlice.actions.openReviewModal()),
    onClose: () => dispatch(reviewModalSlice.actions.closeReviewModal()),
  };
};

export default useSearchModal;
