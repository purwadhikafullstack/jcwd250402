import { lazy } from "react";
import { Toaster } from "sonner";
import { Route, Routes } from "react-router-dom";
import { TenantLogin, Home } from "./pages";
import { TenantDashboard, TenantRegisterPage, PageNotFound } from "./pages";
import ProtectedRoute from "./utils/protectedRoute";
import AuthModal from "./components/Modals/AuthModal";
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
      <TenantRegisterModal />
      <AuthModal/>
      <Routes>
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        {/* </Route> */}
        <Route path="/" element={<Home />} />
        <Route path="/tenant" element={<TenantLogin />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/tenant/register" element={<TenantRegisterPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default App;
