import Heading from "../../Heading";
import FavoriteButton from "../../FavoriteButton";

const ListingHeader = ({ name, coverImage, city, province, id }) => {
  return (
    <>
      <Heading title={name} subtitle={`${city}, ${province}`} />
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <img
          src={`http://localhost:8000/api/property-asset/${coverImage}`}
          fill
          className="object-cover w-full"
          alt="listing"
        />
        {/* <div className="absolute top-5 right-5">
          <FavoriteButton listingId={id} currentUser={currentUser} />
        </div> */}
      </div>
    </>
  );
};

export default ListingHeader;
