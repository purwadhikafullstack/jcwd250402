import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedTenantRoute = ({ children }) => {
  const navigate = useNavigate();
  const isTenant = useSelector((state) => state.auth.isTenant);

  useEffect(() => {
    if (!isTenant) {
      navigate("/");
    }
  }, [isTenant, navigate]);

  return isTenant ? children : null;
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};

export { ProtectedRoute, ProtectedTenantRoute };
