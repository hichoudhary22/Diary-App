import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Navbar from "./Navbar";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
      <Navbar />
      <div className="flex flex-col gap-2 w-full h-full items-center justify-center">
        <h1 className="text-3xl">
          Did not find the page you were looking for...
        </h1>
        <h1 className="text-3xl">go to...</h1>
        <div>
          <Button onClick={() => navigate("/")}>Login</Button>
          <Button onClick={() => navigate("/signUp")}>Signup</Button>
          <Button onClick={() => navigate("/diary")}>Diary Home</Button>
        </div>
      </div>
    </div>
  );
}
