import { createSlice } from "@reduxjs/toolkit";

const loginModalSlice = createSlice({
  name: "loginModal",
  initialState: { isOpen: false },
  reducers: {
    openLoginModal(state) {
      state.isOpen = true;
    },
    closeLoginModal(state) {
      state.isOpen = false;
    },
  },
});

const searchModalSlice = createSlice({
  name: "searchModal",
  initialState: { isOpen: false },
  reducers: {
    openSearchModal(state) {
      state.isOpen = true;
    },
    closeSearchModal(state) {
      state.isOpen = false;
    },
  },
});

const reviewModalSlice = createSlice({
  name: "reviewModal",
  initialState: { isOpen: false },
  reducers: {
    openReviewModal(state) {
      state.isOpen = true;
    },
    closeReviewModal(state) {
      state.isOpen = false;
    },
    setBookingId(state, action) {
      state.bookingId = action.payload;
    },
  },
});

const paymentModalSlice = createSlice({
  name: "paymentModal",
  initialState: { isOpen: false },
  reducers: {
    openPaymentModal(state) {
      state.isOpen = true;
    },
    closePaymentModal(state) {
      state.isOpen = false;
    },
    setBookingId(state, action) {
      state.bookingId = action.payload;
    },
  },
});

const proofImageModalSlice = createSlice({
  name: "proofImageModal",
  initialState: { isOpen: false },
  reducers: {
    openProofImageModal(state) {
      state.isOpen = true;
    },
    closeProofImageModal(state) {
      state.isOpen = false;
    },
    setImageUrl(state, action) {
      state.imageUrl = action.payload;
    },
  },
});

const tenantRegisterSlice = createSlice({
  name: "tenantRegister",
  initialState: { isOpen: false },
  reducers: {
    openTenantRegister(state) {
      state.isOpen = true;
    },
    closeTenantRegister(state) {
      state.isOpen = false;
    },
  },
});

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: { isOpen: false },
  reducers: {
    openUserRegister(state) {
      state.isOpen = true;
    },
    closeUserRegister(state) {
      state.isOpen = false;
    },
  },
});

const verifyRegisterUserSlice = createSlice({
  name: "verifyRegisterUser",
  initialState: { isOpen: false },
  reducers: {
    openVerifyRegisterUser(state) {
      state.isOpen = true;
    },
    closeVerifyRegisterUser(state) {
      state.isOpen = false;
    },
  },
});

const propertyDeleteSlice = createSlice({
  name: "propertyDelete",
  initialState: {
    isOpen: false,
    propertyId: null,
  },
  reducers: {
    openPropertyDelete(state) {
      state.isOpen = true;
    },
    closePropertyDelete(state) {
      state.isOpen = false;
      state.propertyId = null;
    },
    setPropertyId(state, action) {
      state.propertyId = action.payload;
    },
  },
});

const resetCalendarSlice = createSlice({
  name: "resetCalendar",
  initialState: {
    isOpen: false,
    propertyId: null,
  },
  reducers: {
    openResetCalendar(state) {
      state.isOpen = true;
    },
    closeResetCalendar(state) {
      state.isOpen = false;
      state.propertyId = null;
    },
    setPropertyId(state, action) {
      state.propertyId = action.payload;
    },
  },
});

const roomDeleteSlice = createSlice({
  name: "roomDelete",
  initialState: {
    isOpen: false,
    roomId: null,
    propertyId: null,
  },
  reducers: {
    openRoomDelete(state) {
      state.isOpen = true;
    },
    closeRoomDelete(state) {
      state.isOpen = false;
      state.roomId = null;
    },
    setRoomId(state, action) {
      state.roomId = action.payload;
    },
    setPropertyId(state, action) {
      state.propertyId = action.payload;
    },
  },
});

export {
  roomDeleteSlice,
  proofImageModalSlice,
  paymentModalSlice,
  propertyDeleteSlice,
  loginModalSlice,
  tenantRegisterSlice,
  userRegisterSlice,
  verifyRegisterUserSlice,
  searchModalSlice,
  reviewModalSlice,
  resetCalendarSlice,
};
