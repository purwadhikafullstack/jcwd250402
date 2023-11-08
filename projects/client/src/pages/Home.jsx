import { Navbar, Footer } from "../components";
import { LoginModal, TenantRegisterModal } from "../components/Modals";

function Home() {
  return (
    <main>
      <Navbar />
      <LoginModal />
      <TenantRegisterModal />
      <Footer />
    </main>
  );
}

export default Home;
