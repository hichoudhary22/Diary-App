import { useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import readableDate from "../utils/readableDate";
import Button from "./Button";

export default function DiaryEntriesListItem({ entry }) {
  const navigate = useNavigate();
  const [dispatch] = useDataContext();

  async function handelDelete() {
    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;

    const sentData = { id: entry._id };
    const response = await fetch(`${serverRootUrl}/diary/`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify(sentData),
    });
    if (response.status === 200) {
      dispatch({ type: "deleteOneEntry", id: entry._id });
    } else {
      alert("something went wrong");
    }
  }

  if (entry === "none")
    return (
      <p className="px-4 border-2 border-white rounded-md my-2 py-4 text-2xl font-semibold">
        seems like you do not have any entry, create
        <Button
          onClick={() => {
            navigate("/diary/newEntry");
          }}
        >
          new entry
        </Button>
      </p>
    );

  return (
    <div className="pl-2 rounded-md my-2 flex justify-between items-center bg-slate-200">
      <li
        onClick={() => {
          console.log("expand this entry");
        }}
      >
        <h3>{entry.heading}</h3>
        <p className="font-extralight text-sm">{readableDate(entry.date)}</p>
      </li>
      <div className="flex">
        <Button onClick={() => navigate(`/diary/${entry._id}`)}>Edit</Button>
        <Button onClick={handelDelete}>Delete</Button>
      </div>
    </div>
  );
}
