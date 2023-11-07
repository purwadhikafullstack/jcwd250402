import { Navbar, Footer } from "./components";
import LoginModal from "./components/Modals/LoginModal";
import TenantRegisterModal from "./components/Modals/TenantRegister";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <main>
      <Navbar />
      <Footer />
      <LoginModal />
      <TenantRegisterModal />
      <Toaster richColors />
      <Routes>
        <Route />
      </Routes>
    </main>
  );
}

export default App;
