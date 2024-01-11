import React, { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import getBookingData from "../actions/getBookingData";
import BookingCards from "../components/bookings/BookingCards";
import { Navbar, Footer, Heading, Container } from "../components";
import { LoadingOverlay, Box } from "@mantine/core";

const BookingsPage = () => {
  document.title = "Bookings";
  const bookingData = getBookingData();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await bookingData;
        if (data) {
          setBookings(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (bookings.length === 0) {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <EmptyState
          title="No bookings were found"
          subtitle="Looks like you haven't made any bookings yet."
        />
      </div>
    );
  }

  return (
    <Box className="flex flex-col min-h-screen">
      <LoadingOverlay visible={isLoading} zIndex={1000000} />
      <Navbar>
        <main className="flex-1">
          <div className="pb-20 pt-28">
            <Container>
              <Heading
                title="Bookings"
                subtitle="These are the properties that you have booked."
              />
              <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
                {bookings.map((booking) => {
                  return (
                    <BookingCards key={booking.id} bookingData={booking} />
                  );
                })}
              </div>
            </Container>
          </div>
        </main>
      </Navbar>
    </Box>
  );
};

export default BookingsPage;
