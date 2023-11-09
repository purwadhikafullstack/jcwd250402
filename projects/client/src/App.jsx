import { ResetPassword, TenantLogin, Home } from "./pages";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { LoginModal, TenantRegisterModal } from "./components/Modals";

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
    </main>
  );
}

export default App;
