import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function ProtectedRoutes() {
  const [{ auth, authLoading }, dispatch] = useDataContext();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (!auth && !authLoading) {
        const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
        try {
          const response = await fetch(`${serverRootUrl}/user/check-auth`, {
            method: "GET",
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            dispatch({ type: "setAuth", auth: true });
            dispatch({ type: "setUserName", userName: data.userName });
          }
        } catch (error) {
          console.error("Error checking auth:", error);
        }
      }
      setIsChecking(false);
    }

    checkAuth();
  }, [auth, authLoading, dispatch]);

  if (isChecking || authLoading) {
    return <Loading />;
  }

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}
