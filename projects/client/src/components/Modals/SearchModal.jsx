import React, { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import Modal from "./Modal";
import useSearchModal from "../hooks/useSearchModal";
import { useNavigate } from "react-router-dom";
import { Calendar, CountrySelect, Counter } from "../inputs";
import Heading from "../Heading";
import Map from "../Map";

const steps = {
  Location: 0,
  Date: 1,
  Info: 2,
};

const SearchModal = ({ latitude, longitude }) => {
  const searchModal = useSearchModal();
  const navigate = useNavigate();
  const [step, setStep] = React.useState(steps.Location);
  const [countryValue, setCountryValue] = React.useState(null);
  const [locationValue, setLocationValue] = React.useState({
    latitude,
    longitude,
  });
  const [guestCount, setGuestCount] = React.useState(1);
  const [roomCount, setRoomCount] = React.useState(1);
  const [bathroomCount, setBathroomCount] = React.useState(1);
  const [dateRange, setDateRange] = React.useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const center = useMemo(() => {
    if (locationValue.latitude && locationValue.longitude) {
      return [locationValue.latitude, locationValue.longitude];
    }
  }, [locationValue]);

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== steps.Info) {
      return onNext();
    }

    let searchUrl = `search?country=${countryValue.label}`;

    if (dateRange.startDate) {
      const formattedStartDate = format(dateRange.startDate, "yyyy-MM-dd");
      searchUrl += `&startDate=${formattedStartDate}`;
    }

    if (dateRange.endDate) {
      const formattedEndDate = format(dateRange.endDate, "yyyy-MM-dd");
      searchUrl += `&endDate=${formattedEndDate}`;
    }

    searchUrl += `&guestCount=${guestCount}&roomCount=${roomCount}&bathroomCount=${bathroomCount}`;

    setStep(steps.Location);
    searchModal.onClose();
    navigate(searchUrl);
  }, [
    countryValue,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    searchModal,
    bathroomCount,
    step,
    navigate,
  ]);

  const actionLabel = useMemo(() => {
    if (step === steps.Info) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === steps.Location) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={locationValue}
        selectedCountry={countryValue}
        onChange={(value) => setLocationValue(value) || setCountryValue(value)}
      />
      <hr />
      <Map center={center} />
    </div>
  );

  if (step === steps.Date) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === steps.Info) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === steps.Location ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
