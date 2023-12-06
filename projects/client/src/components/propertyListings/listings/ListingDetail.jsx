import { useState, useEffect } from "react";
import { BsHouseDoor } from "react-icons/bs";
import { PiBuildingsBold, PiWarehouseDuotone } from "react-icons/pi";
import { GiSpookyHouse } from "react-icons/gi";
import { MdApartment, MdOutlineBedroomParent } from "react-icons/md";

// const Map = dynamic(() => import("../Map"), {
//   ssr: false,
// });

const ListingDetail = ({
  tenantName,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  propertyType,
  locationValue,
  bedCount,
}) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  //   const { getByValue } = useCountries();
  //   const coordinates = getByValue(locationValue)?.latlng;

  const icons = [
    {
      icon: <BsHouseDoor className="h-14 w-14" />,
      value: "house",
    },
    {
      icon: <MdApartment className="h-14 w-14" />,
      value: "apartment",
    },
    {
      icon: <PiWarehouseDuotone className="h-14 w-14" />,
      value: "guesthouse",
    },
    {
      icon: <GiSpookyHouse className="w-10 h-10" />,
      value: "villa",
    },
    {
      icon: <PiBuildingsBold className="h-14 w-14" />,
      value: "hotel",
    },
    {
      icon: <MdOutlineBedroomParent className="h-14 w-14" />,
      value: "room",
    },
  ];

  useEffect(() => {
    const selected = icons.find((icon) => icon.value === propertyType);
    setSelectedIcon(selected ? selected.icon : null);
    setSelectedValue(
      selected
        ? selected.value.charAt(0).toUpperCase() + selected.value.slice(1)
        : null
    );
  }, [propertyType]);
  return (
    <div className="flex flex-col col-span-4 gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold ">
          <div>Hosted by {tenantName}</div>
          <img src="" alt="" />
        </div>
        <div className="flex flex-row items-center font-light text-center text-neutral-500">
          <div className="flex flex-col items-center justify-center px-4 text-center border-r">
            <div>Guests</div>
            <div>{guestCount}</div>
          </div>
          <div className="flex flex-col items-center justify-center px-4 text-center border-r">
            <div>Rooms</div>
            <div>{roomCount}</div>
          </div>
          <div className="flex flex-col items-center justify-center px-4 text-center border-r">
            <div>Beds</div>
            <div>{bedCount}</div>
          </div>
          <div className="flex flex-col items-center justify-center px-4 text-center">
            <div>Bathrooms</div>
            <div>{bathroomCount}</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <label className="text-lg font-semibold" htmlFor="">
          Type
        </label>
        <div className="flex flex-row items-center gap-3 text-lg font-semibold text-neutral-900">
          <div>{selectedIcon}</div>
          {selectedValue}
        </div>
      </div>
      <hr />
      <label className="text-lg font-semibold" htmlFor="">
        Description
      </label>
      <div className="text-lg font-light text-neutral-600">{description}</div>
      <hr />
      {/* <Map center={coordinates} /> */}
    </div>
  );
};

export default ListingDetail;
