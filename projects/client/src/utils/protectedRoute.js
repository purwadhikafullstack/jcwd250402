import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // Assume your authentication state includes a token and role information
  const auth = { token: true, role: "tenant" };

  // Check if the user is authenticated and has the 'admin' role
  if (auth.token && auth.role === "tenant") {
    return <Outlet />;
  } else {
    // Redirect to the home page if not authenticated or not an admin
    return <Navigate to="/" />;
  }
};

export default PrivateRoutes;

//diemin aja blom fungsi
