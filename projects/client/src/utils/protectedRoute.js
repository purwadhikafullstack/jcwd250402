import { Navigate, Outlet } from "react-router-dom";

const ProtectedTenantRoute = () => {
  const auth = {
    isTenant: localStorage.getItem("isTenant"),
    isLoggedIn: localStorage.getItem("isLoggedIn"),
  };
  return auth.isTenant && auth.isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

const ProtectedRoute = () => {
  const auth = {
    isLoggedIn: localStorage.getItem("isLoggedIn"),
  };
  return auth.isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export { ProtectedRoute, ProtectedTenantRoute };
