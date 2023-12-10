import { useState, useEffect } from "react";
import { Navbar, Footer } from "../components";
import EmptyState from "../components/EmptyState";
import { getListings, ListingCard } from "../components/propertyListings";
import { Loader } from "@mantine/core";
import Container from "../components/Container";

export default function Home() {
  document.title = "Nginapp - Elevate your rental experience";
  const [propertyListings, setPropertyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const listings = await getListings();
        setPropertyListings(listings);
        if (listings.response === 200) {
          setLoading(false);
        }
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
      <div className="flex items-center justify-center h-screen">
        <Loader />
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

  if (!propertyListings) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>Property not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        <div className="pb-20 pt-28">
          <Container>
            <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
              {propertyListings.map((listing) => (
                <ListingCard key={listing.id} data={listing} />
              ))}
            </div>
          </Container>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
