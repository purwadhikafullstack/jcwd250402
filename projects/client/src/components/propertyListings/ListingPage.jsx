import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../";
import { toast } from "sonner";
import { getPropertyData } from "./";
import { ListingHeader, ListingDetail } from "./listings";

const ListingPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyData = await getPropertyData(id);
        if (!propertyData) {
          toast.error("Property not found");
        }
        setProperty(propertyData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <span className="text-center loading loading-spinner loading-lg"></span>
    );
  }

  console.log(property.description);
  return (
    <main>
      <Navbar />
      <div className="pb-20 pt-28">
        <div
          id="container"
          className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 pt-24"
        >
          <div className="flex flex-col gap-6">
            <ListingHeader
              name={property.name}
              coverImage={property.coverImage}
              city={property.categories.city}
              province={property.categories.province}
              id={property.id}
            />
            <div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
              <ListingDetail
                tenantName={property.Owner.fullname}
                category={property.categories}
                propertyType={property.categories.propertyType}
                description={property.description}
                roomCount={property.bedroomCount}
                bedCount={property.bedCount}
                guestCount={property.maxGuestCount}
                bathroomCount={property.bathroomCount}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ListingPage;
