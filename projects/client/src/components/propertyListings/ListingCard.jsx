import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton";

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
  location,
}) => {
  const navigate = useNavigate();

  console.log(data.coverImage);

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
        <div className="text-lg font-semibold">
          {data.categories[0]?.district}, {data.categories[0]?.city}
        </div>
        <div className="font-light text-neutral-500">
          {data.categories[0]?.propertyType
            ? data.categories[0]?.propertyType.charAt(0).toUpperCase() +
              data.categories[0]?.propertyType.slice(1)
            : ""}
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
