import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function AdminProtectedRoutes() {
  const { user } = useContext(UserContext);
  return user.role_id === 2 ? <Outlet /> : <Navigate to="/" replace />;
}
