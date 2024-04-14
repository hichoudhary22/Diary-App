import { Link, useNavigate } from "react-router-dom";
import { useData, useDataDispatch } from "../contexts/DataContext";
import Button from "./Button";
import newEntryImg from "../assets/newEntry.png";

export default function Navbar() {
  const data = useData();
  const dataDispatch = useDataDispatch();
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
      dataDispatch({ type: "resetData" });
      navigate("/");
      alert("logout succesful");
    }
  }
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-2xl sm:text-3xl font-bold capitalize">
          <Link to={"/diary"}>
            {data.userName ? `${data.userName}'s Diary` : "Diary App"}
          </Link>
        </p>
        {data.userName ? (
          <div className="flex gap-2">
            <img
              className="h-8 w-8 sm:h-10 sm:w-10"
              src={newEntryImg}
              onClick={() => navigate("/diary/newEntry")}
            />
            <Button onClick={() => handelLogOut()}>Log Out</Button>
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
