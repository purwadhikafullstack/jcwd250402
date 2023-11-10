import { lazy } from "react";
import { Toaster } from "sonner";
import { Route, Routes } from "react-router-dom";
import { TenantLogin, Home } from "./pages";
import { TenantDashboard, UpdateProfile } from "./pages";
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const UserRegisterModal = lazy(() =>
  import("./components/Modals/UserRegister")
);
const LoginModal = lazy(() => import("./components/Modals/LoginModal"));
const TenantRegisterModal = lazy(() =>
  import("./components/Modals/TenantRegister")
);

function App() {
  return (
    <main>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tenant" element={<TenantLogin />} />
        <Route path="/dashboard" element={<TenantDashboard />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
      <LoginModal />
      <TenantRegisterModal />
      <UserRegisterModal />
    </main>
  );
}

export default App;
