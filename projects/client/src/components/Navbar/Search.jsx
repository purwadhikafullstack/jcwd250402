import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import useSearchModal from "../hooks/useSearchModal";
import { useSearchParams } from "react-router-dom";
import { parseISO, differenceInDays, format } from "date-fns";

const Search = ({ transparent }) => {
  const searchModal = useSearchModal();
  const [searchParams] = useSearchParams();

  const locationValue = searchParams.get("country");
  const guestCount = searchParams.get("guestCount");
  let startDate = searchParams.get("startDate");
  let endDate = searchParams.get("endDate");
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      let diff = differenceInDays(endDate, startDate);
      if (diff === 0) {
        diff = 1;
      }

      if (diff === 1) {
        return "Any Day";
      }

      return `${diff} Days`;
    }

    return "Any Day";
  }, [startDate, endDate]);

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return locationValue.split(",")[0];
    }

    return "Anywhere";
  }, [locationValue]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);
  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] bg-white w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div
        className={`flex flex-row items-center justify-between ${
          transparent ? "text-white" : "text-black"
        } `}
      >
        <div className="px-6 text-sm font-normal font-primary hover:font-semibold">
          {locationLabel}
        </div>
        <div className="hidden md:block text-sm font-normal px-6 border-x-[1px] flex-1 hover:font-semibold text-center">
          {durationLabel}
          {/* Any Week */}
        </div>
        <div
          className={`flex flex-row items-center gap-3 pl-6 pr-2 text-sm font-normal hover:font-semibold ${
            transparent ? "text-white" : "text-black"
          }`}
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className={`p-2 border rounded-full ${
              transparent
                ? "text-primary bg-white"
                : "text-primary font-bold bg-none"
            }`}
          >
            <BiSearch size={18} color="black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
