import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Homepage() {
  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
      <Navbar />
      <Outlet />
    </div>
  );
}
export default Homepage;
