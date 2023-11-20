import { lazy } from "react";
import { Toaster } from "sonner";
import { Route, Routes } from "react-router-dom";
import { TenantLogin, Home } from "./pages";
import {
  TenantDashboard,
  TenantRegisterPage,
  PageNotFound,
  CreateProperty,
} from "./pages";
import { ProtectedRoute, ProtectedTenantRoute } from "./utils/protectedRoute";
import AuthModal from "./components/Modals/AuthModal";
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const TenantRegisterModal = lazy(() =>
  import("./components/Modals/TenantRegister")
);

function App() {
  return (
    <main>
      <Toaster richColors />
      <TenantRegisterModal />
      <AuthModal />
      <Routes>
        {/* <Route element={<ProtectedTenantRoute />}> */}
        <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        {/* </Route> */}
        <Route path="/" element={<Home />} />
        <Route path="/tenant" element={<TenantLogin />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/tenant/register" element={<TenantRegisterPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/tenant/dashboard/create-property"
          element={<CreateProperty />}
        />
      </Routes>
    </main>
  );
}

export default App;
