import { lazy } from "react";
import { Toaster } from "sonner";
import { Route, Routes } from "react-router-dom";
import { TenantLogin, Home } from "./pages";
import {
  TenantDashboard,
  TenantRegisterPage,
  PageNotFound,
  CreateProperty,
  EditProperty,
} from "./pages";
import { ProtectedRoute, ProtectedTenantRoute } from "./utils/protectedRoute";
import AuthModal from "./components/Modals/AuthModal";
import VerifyUserPage from "./pages/VerifyUserPage";
import { PropertyDelete } from "./components/Modals";
import { ListingPage } from "./components/propertyListings";
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
      <PropertyDelete />
      <Routes>
        <Route path="/tenant/dashboard" element={<ProtectedTenantRoute />}>
          <Route index element={<TenantDashboard />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<ListingPage />} />
        <Route path="/tenant" element={<TenantLogin />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/tenant/register" element={<TenantRegisterPage />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/tenant/dashboard/create-property"
          element={<CreateProperty />}
        />
        <Route path="/verify-email" element={<VerifyUserPage />} />
      </Routes>
    </main>
  );
}

export default App;
