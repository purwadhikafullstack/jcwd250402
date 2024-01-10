import { useSelector, useDispatch } from "react-redux";
import { resetCalendarSlice } from "./modalSlice";

const useCalendarResetModal = () => {
  const state = useSelector((state) => state.propertyDelete);
  const dispatch = useDispatch();

  const setPropertyId = (propertyId) => {
    dispatch(resetCalendarSlice.actions.setPropertyId(propertyId));
  };

  return {
    isOpen: state.isOpen,
    propertyId: state.propertyId,
    onOpen: () => dispatch(resetCalendarSlice.actions.openResetCalendar()),
    onClose: () => dispatch(resetCalendarSlice.actions.closeResetCalendar()),
    setPropertyId,
  };
};

export default useCalendarResetModal;
