import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";

export default function ProtectedRoutes() {
  const [data] = useDataContext();
  const location = useLocation();

  return data.auth ? (
    <Outlet />
  ) : (
    <div>
      {alert("please login first")}
      <Navigate to={"/"} replace state={{ from: location }} />
    </div>
  );
}
