import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth.roles.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
