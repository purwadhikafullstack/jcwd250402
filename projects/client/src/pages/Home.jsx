import { useState, useEffect, useRef } from "react";
import { Navbar, Footer } from "../components";
import EmptyState from "../components/EmptyState";
import { getListings, ListingCard } from "../components/propertyListings";
import { Skeleton, Card } from "@mantine/core";
import Container from "../components/Container";
import Hero from "../components/Hero";
import { Pagination } from "@mantine/core";
import api from "../api";
import { useLocation } from "react-router-dom";

export default function Home() {
  document.title = "Nginapp - Elevate your rental experience";
  const [propertyListings, setPropertyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transparentNavbar, setTransparentNavbar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(window.location.search);
        const country = params.get("country");
        const startDate = params.get("startDate");
        const endDate = params.get("endDate");
        const guestCount = params.get("guestCount");
        const roomCount = params.get("roomCount");
        const bathroomCount = params.get("bathroomCount");

        if (country) {
          const searchResults = await api.get(
            `/property?country=${country}&startDate=${startDate}&endDate=${endDate}&guestCount=${guestCount}&roomCount=${roomCount}&bathroomCount=${bathroomCount}`
          );
          const searchData = await searchResults.data;
          setPropertyListings(searchData.Properties);

          if (searchResults.status === 200) {
            setLoading(false);
          }
        } else {
          const listings = await getListings();
          setPropertyListings(listings.Properties);

          if (listings.status === 200) {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  const prevScrollY = useRef(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (prevScrollY.current !== scrollY) {
      const scrollThreshold = window.innerWidth > 1366 ? 500 : 250;
      setTransparentNavbar(scrollY <= scrollThreshold);
      prevScrollY.current = scrollY;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!propertyListings || propertyListings.length === 0) {
    return (
      <div>
        <div className="flex flex-col min-h-screen">
          <Navbar transparent={transparentNavbar}>
            <Hero />
            <main className="flex-1">
              <div className="pt-24 pb-20 md:pt-0">
                <Container>
                  <EmptyState
                    title="No listings found"
                    description="We couldn't find any listings. Please try again later."
                  />
                </Container>
              </div>
            </main>
          </Navbar>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }

  // console.log(propertyListings);
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar transparent={transparentNavbar}>
          <Hero />
          <main className="flex-1">
            <div className="pb-20 md:pt-0">
              <Container>
                <div className="pt-8">
                  <h1 className="text-3xl font-semibold">
                    Discover Your Perfect Space
                  </h1>
                </div>
                <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                  {loading
                    ? Array.from({ length: 18 }).map((_, index) => (
                        <Card key={index} shadow="sm" padding="lg">
                          <Skeleton height={200} />
                          <div className="my-4" />
                          <Skeleton height={10} />
                          <div className="my-1" />
                          <Skeleton height={10} />
                          <div className="my-1" />
                          <Skeleton height={10} />
                          <div className="my-1" />
                        </Card>
                      ))
                    : propertyListings.map((listing) => (
                        <div key={listing.id}>
                          <ListingCard data={listing} />
                        </div>
                      ))}
                </div>
              </Container>
            </div>
            <div className="flex justify-center pb-8">
              <Pagination total={100} />
            </div>
          </main>
        </Navbar>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
