import { useSelector, useDispatch } from "react-redux";
import { reviewModalSlice } from "./modalSlice";

const useReviewModal = () => {
  const state = useSelector((state) => state.reviewModal);
  const dispatch = useDispatch();

  const setBookingId = (propertyId) => {
    dispatch(reviewModalSlice.actions.setBookingId(propertyId));
  };

  return {
    isOpen: state.isOpen,
    bookingId: state.bookingId,
    onOpen: () => dispatch(reviewModalSlice.actions.openReviewModal()),
    onClose: () => dispatch(reviewModalSlice.actions.closeReviewModal()),
    setBookingId,
  };
};

export default useReviewModal;
