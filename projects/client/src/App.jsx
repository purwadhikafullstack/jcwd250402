import { Navbar, Footer } from "./components";
import ResetPassword from "./pages/ResetPassword";
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
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </main>
  );
}

export default App;
