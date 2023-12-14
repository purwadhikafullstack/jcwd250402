import { Navbar, Footer } from "../components";

function Home() {
  document.title = "Nginapp - Elevate your rental experience";
  return (
    <main>
      <Navbar />
      <Footer />
    </main>
  );
}

export default Home;
