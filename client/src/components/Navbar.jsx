import { Link, useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import Button from "./Button";
import pencil from "../assets/pencil.png";
import HamburgerMenu from "./HamburgerMenu";

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
            <div className="hidden sm:flex">
              <img
                className="h-8 w-8 mx-2"
                src={pencil}
                onClick={() => navigate("/diary/newEntry")}
              />
              <Button onClick={handelLogOut}>Log Out</Button>
            </div>
            <HamburgerMenu handelLogOut={handelLogOut} />
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
