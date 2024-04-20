import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useDataContext } from "../contexts/DataContext";
import Loading from "./Loading";

export default function PopUp({ id, heading, date, content, setShowPopUp }) {
  const navigate = useNavigate();
  const [{ isLoading }, dispatch] = useDataContext();

  date = new Date(date).toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function handelDelete() {
    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
    dispatch({ type: "setIsLoading", isLoading: true });

    const sentData = { id };
    const response = await fetch(`${serverRootUrl}/diary/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify(sentData),
    });
    dispatch({ type: "setIsLoading", isLoading: false });

    if (response.status === 200) {
      dispatch({ type: "deleteOneEntry", id });
    } else {
      alert("something went wrong");
    }
  }

  return (
    <div
      className="absolute flex justify-center items-center w-full h-full top-0 left-0"
      //   onClick={() => setShowPopUp(false)}
    >
      {isLoading && <Loading />}
      <div className="flex flex-col gap-2 h-5/6 w-5/6 p-4 rounded-2xl bg-slate-200">
        <div className="flex self-end">
          <Button onClick={() => navigate(`/diary/${id}`)}>Edit</Button>
          <Button onClick={handelDelete}>Delete</Button>
          <Button onClick={() => setShowPopUp(false)}>&times;</Button>
        </div>
        <p className="bg-slate-50 p-1 text-xl rounded-md">{heading}</p>
        <p className="bg-slate-50 p-1 text-xl rounded-md">{date}</p>
        <p className="bg-slate-50 p-1 text-xl rounded-md h-full overflow-scroll">
          {content}
        </p>
      </div>
    </div>
  );
}
