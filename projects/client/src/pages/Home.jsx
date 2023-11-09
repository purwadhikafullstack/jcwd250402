import { Navbar, Footer } from "../components";
import {
  LoginModal,
  TenantRegisterModal,
  UserRegisterModal,
} from "../components/Modals";

function Home() {
  return (
    <main>
      <Navbar />
      <LoginModal />
      <TenantRegisterModal />
      <UserRegisterModal />
      <Footer />
    </main>
  );
}

export default Home;
