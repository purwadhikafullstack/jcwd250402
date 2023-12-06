import { useState, useEffect } from "react";
import { Navbar, Footer } from "../components";
import EmptyState from "../components/EmptyState";
import { getListings, ListingCard } from "../components/propertyListings";

export default function Home() {
  document.title = "Nginapp - Elevate your rental experience";
  const [propertyListings, setPropertyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listings = await getListings();
        setPropertyListings(listings);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="pb-20 pt-28">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const isEmpty = propertyListings.length === 0;

  if (isEmpty) {
    return (
      <div>
        <Navbar />
        <div className="pb-20 pt-28">
          <EmptyState showReset />
        </div>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="pb-20 pt-28">
        <div
          id="container"
          className="
        max-w-[2520px]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2
        px-4
      "
        >
          <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
            {propertyListings.map((listing) => (
              <ListingCard key={listing.id} data={listing} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
