import api from "../api";

export default async function getPropertyData() {
  try {
    const bookingData = await api.get("/booking/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (bookingData.status === 200) {
      const booking = bookingData.data.Booking;
      console.log(booking);
      return {
        id: booking.id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        guestCount: booking.guestCount,
        totalPrice: booking.totalPrice,
        tenantId: booking.tenantId,
        property: {
          propertyName: booking.property.propertyName,
        },
        renter: {
          renterName: booking.renter.renterName,
        },
      };
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
}
