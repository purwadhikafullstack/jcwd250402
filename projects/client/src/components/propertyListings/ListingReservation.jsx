import React, { useState, useEffect } from "react";
import Button from "../Button";
import Calendar from "../inputs/Calendar";
import { differenceInCalendarDays } from "date-fns";
import api from "../../api";

const ListingReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  maxGuests,
  guestCount,
  setGuestCount,
  roomData,
  propertyData,
  rentEntireProperty,
  selectedRoom,
  onSelectRoom,
  propertyId,
}) => {
  const [specialPriceDate, setSpecialPriceDate] = useState([]);
  const [unavailableDate, setUnavailableDate] = useState({});
  const [selectedSpecialDate, setSelectedSpecialDate] = useState(null);
  const [isSpecialDate, setIsSpecialDate] = useState(false);

  useEffect(() => {
    const getSpecialPriceDate = async () => {
      try {
        const response = await api.get(`/date/special/${propertyId}`);
        if (response.status === 200) {
          setSpecialPriceDate(response.data.specialDates);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSpecialPriceDate();
  }, [propertyId]);

  useEffect(() => {
    const getDisabledDate = async () => {
      try {
        const response = await api.get(`/date/disabled/${propertyId}`);
        if (response.status === 200) {
          setUnavailableDate(response.data.disabledDates);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDisabledDate();
  }, [propertyId]);

  useEffect(() => {
    const isSpecialDate = specialPriceDate.some(
      (specialDate) =>
        dateRange.startDate >= new Date(specialDate.startDate) &&
        dateRange.endDate <= new Date(specialDate.endDate)
    );

    setIsSpecialDate(isSpecialDate);

    if (isSpecialDate) {
      const specialDate = specialPriceDate.find(
        (specialDate) =>
          dateRange.startDate >= new Date(specialDate.startDate) &&
          dateRange.endDate <= new Date(specialDate.endDate)
      );

      setSelectedSpecialDate(specialDate);
    } else {
      setSelectedSpecialDate(null);
    }
  }, [
    dateRange.startDate,
    dateRange.endDate,
    specialPriceDate,
    propertyData,
    price,
  ]);

  price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  totalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const handleSelection = (roomId) => {
    onSelectRoom(roomId);
  };

  const roomPrice = rentEntireProperty
    ? propertyData.price
    : selectedRoom
    ? selectedRoom.price
    : 0;

  const dayCount = differenceInCalendarDays(
    dateRange.endDate,
    dateRange.startDate
  );

  let roomPricePerNight = isSpecialDate ? selectedSpecialDate.price : roomPrice;

  let roomPriceTotal = roomPricePerNight * dayCount;

  if (selectedRoom) {
    roomPricePerNight = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roomPricePerNight);
    roomPriceTotal = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roomPriceTotal);
  }

  const combinedDisabledDates = [
    ...disabledDates,
    ...(unavailableDate
      ? Object.values(unavailableDate).flatMap((dateRange) => {
          const startDate = new Date(dateRange.startDate);
          const endDate = new Date(dateRange.endDate);
          const datesInRange = [];

          for (
            let current = startDate;
            current <= endDate;
            current.setDate(current.getDate() + 1)
          ) {
            datesInRange.push(new Date(current));
          }

          return datesInRange;
        })
      : []),
  ];

  const calculateTotalPrice = () => {
    const roomPrice = rentEntireProperty
      ? propertyData.price
      : selectedRoom
      ? selectedRoom.price
      : 0;

    const dayCount = differenceInCalendarDays(
      dateRange.endDate,
      dateRange.startDate
    );

    const specialDate = specialPriceDate.find(
      (specialDate) =>
        dateRange.startDate >= new Date(specialDate.startDate) &&
        dateRange.endDate <= new Date(specialDate.endDate)
    );

    const roomPricePerNight = specialDate ? specialDate.price : roomPrice;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roomPricePerNight * dayCount);
  };

  const totalDisplayedPrice = selectedRoom
    ? roomPriceTotal
    : calculateTotalPrice();

  return (
    <section className="my-4 md:my-0 ">
      <div className="flex flex-col p-5 mb-4 border rounded-xl">
        <div className="p-2">
          <h1 className="text-lg font-semibold">
            Select the room you want to stay in
          </h1>
        </div>
        {roomData.map((room, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between px-3 py-4 border-t"
          >
            <div className="flex flex-row items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full">
                <img
                  src={`http://localhost:8000/api/property-asset/${room.roomImages[0].image}`}
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div>
                <div className="text-lg font-semibold">{room.roomName}</div>
                <div className="text-sm text-gray-500">{`${room.bedCount} bed, ${room.bathroomCount} bathroom`}</div>
              </div>
            </div>
            <div className="text-lg font-semibold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(room.price)}
            </div>
            <button
              className="px-4 py-2 text-white border rounded-lg bg-primary hover:opacity-80"
              onClick={() => handleSelection(room.id)}
            >
              Select
            </button>
          </div>
        ))}
        <div className="flex flex-row items-center justify-between px-3 py-2 border-t">
          <div className="flex flex-row items-center gap-3 pt-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full">
              <img
                src={`http://localhost:8000/api/property-asset/${propertyData.coverImage}`}
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div>
              {propertyData.categories.propertyType === "room" ? (
                <>
                  <div className="text-lg font-semibold">Rent this room</div>
                </>
              ) : (
                <div className="text-lg font-semibold">Rent the Property</div>
              )}
            </div>
          </div>
          <div className="text-lg font-semibold">{price}</div>
          <button
            className="px-4 py-2 text-white border rounded-lg bg-primary hover:opacity-80"
            onClick={() => handleSelection()}
          >
            Select
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden shadow-xl">
        <div className="flex flex-row items-center justify-evenly">
          <div className="flex flex-row items-center gap-1 p-4">
            {selectedRoom ? (
              <>
                <div className="text-2xl font-semibold">
                  {isSpecialDate
                    ? `selectedSpecialDate.price`
                    : roomPricePerNight}
                </div>
                <div className="text-sm font-light text-neutral-600">
                  / night
                </div>
              </>
            ) : (
              <>
                <div className="text-lg font-semibold md:text-2xl">
                  {isSpecialDate
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(selectedSpecialDate.price)
                    : price}
                </div>
                <div className="text-lg font-light text-neutral-600">
                  / night
                </div>
              </>
            )}
          </div>
          <div className="text-xl font-semibold">Guests:</div>
          <div className="flex flex-row items-center gap-2 p-4">
            <button
              className={`rounded-full border-[1px] border-neutral-200 w-8 h-8 flex items-center justify-center ${
                guestCount === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (guestCount > 0) setGuestCount(guestCount - 1);
              }}
            >
              -
            </button>
            <div className="rounded-full border-[1px] border-neutral-200 w-8 h-8 flex items-center justify-center">
              {guestCount}
            </div>
            <button
              className={`rounded-full border-[1px] border-neutral-200 w-8 h-8 flex items-center justify-center ${
                guestCount === maxGuests ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (guestCount < maxGuests) setGuestCount(guestCount + 1);
              }}
            >
              +
            </button>
          </div>
        </div>
        <hr />
        <Calendar
          value={dateRange}
          disabledDates={combinedDisabledDates}
          onChange={(value) => onChangeDate(value.selection)}
          specialDates={specialPriceDate}
        />
        <hr />
        <div className="p-4">
          <Button
            disabled={disabled || !guestCount || !dateRange}
            label="Reserve"
            onClick={onSubmit}
          />
        </div>
        <hr />

        {selectedSpecialDate ? (
          <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
            <div>Total (Special Discount):</div>
            <div>{calculateTotalPrice()}</div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
            <div>Total:</div>
            {selectedRoom ? (
              <>
                <div>{roomPriceTotal}</div>
              </>
            ) : (
              <>
                <div>{totalPrice}</div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ListingReservation;
