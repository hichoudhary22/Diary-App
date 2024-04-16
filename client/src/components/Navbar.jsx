import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import Button from "./Button";
import newEntryImg from "../assets/newEntry.png";

export default function Navbar() {
  const [{ userName }, dispatch] = useDataContext();
  const navigate = useNavigate();

  async function handelLogOut() {
    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;

    const logOutResponse = await fetch(`${serverRootUrl}/user/logout`, {
      method: "GET",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (logOutResponse.status !== 200) {
      alert("something went wrong try again");
    } else {
      dispatch({ type: "resetData" });
      navigate("/");
      alert("logout succesful");
    }
  }
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl font-bold capitalize">
          <Link to={"/diary"}>
            {userName ? `${userName}'s Diary` : "Diary App"}
          </Link>
        </p>
        {userName ? (
          <div className="flex gap-2">
            <img
              className="h-12 w-12 -my-2"
              src={newEntryImg}
              onClick={() => navigate("/diary/newEntry")}
            />
            <Button onClick={handelLogOut}>Log Out</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => navigate("/signUp")}>Sign Up</Button>
            <Button onClick={() => navigate("/")}>Login</Button>
          </div>
        )}
      </div>
      <hr className="my-1" />
    </div>
  );
}
