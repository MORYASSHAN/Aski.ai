import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store/authStore.js";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}
