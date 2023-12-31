import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { Navbar, Footer } from "../";
import { toast } from "sonner";
import useLoginModal from "../hooks/useLoginModal";
import { getPropertyData, ListingReservation } from "./";
import { PropertyHeader, PropertyDetail } from "./property";
import { Loader } from "@mantine/core";
import { differenceInCalendarDays } from "date-fns";
import Container from "../Container";
import getBookedDates from "../../actions/getBookedDates";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const loginModal = useLoginModal();
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [guestCount, setGuestCount] = useState(0);
  const [bookedDates, setBookedDates] = useState([]);
  const [propertyName, setPropertyName] = useState("");

  const disabledDates = useMemo(() => {
    return bookedDates.map((dateString) => new Date(dateString));
  }, [bookedDates]);

  const [rentEntireProperty, setRentEntireProperty] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyData = await getPropertyData(id);
        if (!propertyData) {
          toast.error("Property not found");
        }
        setProperty(propertyData);
        setTotalPrice(propertyData.price);
        setPropertyName(propertyData.name);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const incrementViewCount = async () => {
      try {
        if (!requestSent) {
          await api.post(`/property/view/${id}`);
          setRequestSent(true);
        }
      } catch (error) {}
    };
    const timeoutId = setTimeout(() => {
      incrementViewCount();
    }, 30000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, requestSent]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const dates = await getBookedDates(id);
        setBookedDates(dates.bookedDates);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchBookedDates();
  }, [id]);

  const onCreateReservation = useCallback(async () => {
    if (!localStorage.getItem("token") && !localStorage.getItem("isLoggedIn")) {
      loginModal.onOpen();
      return;
    }

    let roomPrice = 0;

    if (rentEntireProperty) {
      roomPrice = property.price;
    } else if (selectedRoom) {
      roomPrice = selectedRoom.price;
    }

    const dayCount = differenceInCalendarDays(
      dateRange.endDate,
      dateRange.startDate
    );
    const totalPrice = dayCount * roomPrice;

    setLoading(true);

    const commonData = {
      startDate: dateRange.startDate.toISOString(),
      endDate: dateRange.endDate.toISOString(),
      guestCount: guestCount,
      totalPrice: totalPrice,
      tenantId: property.Owner.id,
      propertyId: property.id,
    };

    let requestData = {};

    if (rentEntireProperty) {
      requestData = commonData;
    } else if (selectedRoom) {
      requestData = {
        ...commonData,
        roomId: selectedRoom.id,
      };
    }

    try {
      const response = await api.post("/booking/new", requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const { data } = response;
      toast.success(data.message);
      setDateRange(initialDateRange);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [
    dateRange,
    guestCount,
    property?.id,
    loginModal,
    property?.Owner?.id,
    rentEntireProperty,
    selectedRoom,
  ]);

  document.title = `${propertyName} - Nginapp`;
  useEffect(() => {
    if (
      dateRange.startDate &&
      dateRange.endDate &&
      property &&
      property.price
    ) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount) {
        setTotalPrice(dayCount * property.price);
      } else {
        setTotalPrice(property.price);
      }
    }
  }, [dateRange, property]);

  const handleSelection = (roomId) => {
    if (roomId) {
      const room = property.Rooms.find((room) => room.id === roomId);
      setSelectedRoom(room);
      setRentEntireProperty(false);
    } else {
      setSelectedRoom(null);
      setRentEntireProperty(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  const propertyNotFound = (
    <div className="flex items-center justify-center h-screen">
      <h1>Property not found</h1>
    </div>
  );
  return (
    <main>
      <Navbar>
        <div className="pb-20 pt-28">
          {property ? (
            <Container>
              <div className="flex flex-col gap-6">
                <PropertyHeader
                  name={`${property.categories.propertyType
                    .charAt(0)
                    .toUpperCase()}${property.categories.propertyType.slice(
                    1
                  )} in ${property.categories.city}`}
                  coverImage={property.coverImage}
                  propertyImages={property.propertyImages}
                  // city={property.categories.city}
                  province={property.categories.province}
                  country={property.categories.country}
                  id={property.id}
                />
                <div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
                  <PropertyDetail
                    tenantName={property.Owner.fullname}
                    tenantImg={property.Owner.profilePicture}
                    tenantVerified={property.Owner.isVerified}
                    tenantMemberSince={property.Owner.memberSince}
                    category={property.categories}
                    propertyType={property.categories.propertyType}
                    propertyAmenity={property.propertyAmenities}
                    description={property.description}
                    roomCount={property.bedroomCount}
                    bedCount={property.bedCount}
                    guestCount={property.maxGuestCount}
                    bathroomCount={property.bathroomCount}
                    latitude={property.categories.latitude}
                    longitude={property.categories.longitude}
                    propertyId={property.id}
                  />
                  <div className="order-last mb-10 md:order-last md:col-span-3">
                    <ListingReservation
                      price={property.price}
                      totalPrice={totalPrice}
                      onChangeDate={(value) => setDateRange(value)}
                      dateRange={dateRange}
                      onSubmit={onCreateReservation}
                      disabled={loading}
                      maxGuests={property.maxGuestCount}
                      disabledDates={disabledDates}
                      guestCount={guestCount}
                      setGuestCount={setGuestCount}
                      propertyData={property}
                      roomData={property.Rooms}
                      rentEntireProperty={rentEntireProperty}
                      selectedRoom={selectedRoom}
                      onSelectRoom={handleSelection}
                      propertyId={property.id}
                    />
                  </div>
                </div>
              </div>
            </Container>
          ) : (
            propertyNotFound
          )}
        </div>
        <Footer />
      </Navbar>
    </main>
  );
};

export default ListingPage;
