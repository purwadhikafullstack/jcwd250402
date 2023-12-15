import { useState, useEffect } from "react";
import { Navbar, Footer } from "../components";
import EmptyState from "../components/EmptyState";
import { getListings, ListingCard } from "../components/propertyListings";
import { Skeleton, Card } from "@mantine/core";
import Container from "../components/Container";
import { Carousel } from "@mantine/carousel";
import Hero from "../components/Hero";

export default function Home() {
  document.title = "Nginapp - Elevate your rental experience";
  const [propertyListings, setPropertyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transparentNavbar, setTransparentNavbar] = useState(true);

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
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerWidth >= 1366 ? 1000 : 600;
      const scrollY = window.scrollY;
      setTransparentNavbar(scrollY <= scrollThreshold);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!propertyListings || propertyListings.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <header>
          <Navbar transparent={transparentNavbar} />
        </header>

        <main className="flex-1">
          <div className="pb-20 pt-28">
            <Container>
              <EmptyState
                title="No listings found"
                description="We couldn't find any listings. Please try again later."
              />
            </Container>
          </div>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar transparent={transparentNavbar}>
          <Hero />
          <main className="flex-1">
            <div className="pt-24 pb-20 md:pt-0">
              <Container>
                <div className="grid h-[200vh] grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                  {loading
                    ? Array.from({ length: 12 }).map((_, index) => (
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
                        <ListingCard key={listing.id} data={listing} />
                      ))}
                </div>
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
