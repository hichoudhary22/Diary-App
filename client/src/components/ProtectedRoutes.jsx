import { Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  return <Outlet />;

  // return data.auth ? (
  //   <Outlet />
  // ) : (
  //   <div>
  //     {alert("please login first")}
  //     <Navigate to={"/"} replace state={{ from: location }} />
  //   </div>
  // );
}
