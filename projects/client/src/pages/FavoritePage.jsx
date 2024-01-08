import { Heading, Container, Navbar, Footer } from "../components";
import FavoriteCard from "../components/FavoriteCard";
import getFavoriteListings from "../actions/getFavoriteProperty";
import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";

const FavoritePage = () => {
  const [loading, setLoading] = useState(true);
  const [favoriteListings, setFavoriteListings] = useState([]);
  useEffect(() => {
    const fetchFavoriteListings = async () => {
      try {
        setLoading(true);
        const listings = await getFavoriteListings();

        if (listings) {
          setLoading(false);
          setFavoriteListings(listings.favorites);
        }
      } catch (error) {
        console.error("Error fetching favorite listings:", error);
      }
    };

    fetchFavoriteListings();
  }, []);

  if (!favoriteListings || favoriteListings.length === 0) {
    return (
      <div>
        <div className="flex flex-col min-h-screen">
          <Navbar>
            <main className="flex-1">
              <div className="pt-24 pb-20 md:pt-0">
                <Container>
                  <EmptyState
                    title="No favorites were found"
                    subtitle="Looks like you haven't favorited any property yet."
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

  document.title = "Favorites";
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar>
          <main className="flex-1">
            <div className="pt-24 pb-20 md:pt-0">
              <Container>
                <Heading
                  title="Favorites"
                  subtitle="List of places you have favorited"
                />

                <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                  {favoriteListings.map((listing) => {
                    return <FavoriteCard key={listing.id} data={listing} />;
                  })}
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
};

export default FavoritePage;
