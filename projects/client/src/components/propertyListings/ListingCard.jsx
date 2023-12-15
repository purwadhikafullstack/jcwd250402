import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton";

const ListingCard = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div>
        <div className="w-full bg-gray-200 h-72 animate-pulse rounded-xl">
          no properties
        </div>
      </div>
    );
  }

  console.log(data);
  return (
    <div
      onClick={() => navigate(`/property/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col w-full gap-2">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          <img
            src={`http://localhost:8000/api/property-asset/${data.coverImage}`}
            alt="listings"
            className="object-cover w-full h-full transition group-hover:scale-110 "
          />
          <div className="absolute top-3 right-3">
            <FavoriteButton listingId={data.id} />
          </div>
        </div>
        {/* <div className="text-lg font-semibold">{data.name}</div> */}
        <div className="text-lg font-semibold">
          {data.categories[0]?.province}, {data.categories[0]?.country}
        </div>
        <div className="font-light">
          {data.categories[0]?.propertyType.charAt(0).toUpperCase() +
            data.categories[0]?.propertyType.slice(1)}
          , {"  "}
          {data.categories[0].propertyType !== "room" ? (
            <>
              {data.rooms.length > 0 ? (
                <>
                  {data.rooms.length} {data.rooms.length > 1 ? "Rooms" : "Room"}
                </>
              ) : (
                <>
                  {data.bedroomCount} {data.bedroomCount > 1 ? "Rooms" : "Room"}
                </>
              )}
            </>
          ) : null}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(data.price)}
            /night
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
