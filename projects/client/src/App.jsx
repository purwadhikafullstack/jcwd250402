import { ResetPassword, TenantLogin, Home } from "./pages";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { LoginModal, TenantRegisterModal, UserRegisterModal } from "./components/Modals";

function App() {
  return (
    <main>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tenant-login" element={<TenantLogin />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <LoginModal />
      <TenantRegisterModal />
      <UserRegisterModal />
    </main>
  );
}

export default App;
