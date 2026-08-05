import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser } from "../services/authService";

export default function GuestRoute() {
  const token = getToken();
  const user = getUser();

  if (token && user) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;
  }

  return <Outlet />;
}
