import { useState, useEffect, useRef } from "react";
import { Navbar, Footer } from "../components";
import EmptyState from "../components/EmptyState";
import { getListings, ListingCard } from "../components/propertyListings";
import { Skeleton, Card, Menu, Button, Text } from "@mantine/core";
import Container from "../components/Container";
import Hero from "../components/Hero";
import { Pagination } from "@mantine/core";
import api from "../api";
import { useLocation } from "react-router-dom";
import { MdOutlineSort } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Home() {
  document.title = "Nginapp - Elevate your rental experience";
  const navigate = useNavigate();
  const [propertyListings, setPropertyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transparentNavbar, setTransparentNavbar] = useState(true);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");

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
        const page = currentPage;
        const sortParams = `sort=${sortOption}_${sortOrder}`;

        let listings;
        if (country) {
          const searchResults = await api.get(
            `/property?country=${country}&startDate=${startDate}&endDate=${endDate}&guestCount=${guestCount}&roomCount=${roomCount}&bathroomCount=${bathroomCount}&page=${page}`
          );

          listings = searchResults.data;
        } else {
          listings = await getListings(page);
        }

        setPropertyListings(listings.Properties);

        if (listings.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [location, currentPage, sortOption, sortOrder]);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

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

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar transparent={transparentNavbar}>
          <Hero />
          <main className="flex-1">
            <div className="pb-20 md:pt-0">
              <Container>
                <div className="flex justify-between pt-8">
                  <h1 className="text-3xl font-semibold">
                    Discover Your Perfect Space
                  </h1>
                  <div className="flex font-semibold gap-x-2">
                    <Menu>
                      <Menu.Target>
                        <Button
                          style={{
                            backgroundColor: "transparent",
                            color: "black",
                            cursor: "pointer",
                          }}
                        >
                          <MdOutlineSort size={40} className="cursor-pointer" />
                        </Button>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Label>Sort By</Menu.Label>
                        <Menu.Item
                          onClick={() => handleSortOptionChange("price")}
                        >
                          Price
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => handleSortOptionChange("rating")}
                        >
                          Rating
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => handleSortOptionChange("date_added")}
                        >
                          Date Added
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Label>Order</Menu.Label>
                        <Menu.Item onClick={() => handleSortOrderChange("asc")}>
                          Ascending
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => handleSortOrderChange("desc")}
                        >
                          Descending
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item>
                          <Text className="font-semibold text-md text-neutral-500">
                            Reset
                          </Text>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </div>
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
              <Pagination
                total={3}
                page={currentPage}
                onChange={handlePageChange}
              />
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
