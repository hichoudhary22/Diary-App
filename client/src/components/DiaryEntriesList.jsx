import { useNavigate } from "react-router-dom";
import { useDataDispatch } from "../contexts/DataContext";

export default function DiaryEntriesList({ entry }) {
  const navigate = useNavigate();
  const dataDispatch = useDataDispatch();

  function readableDate(date) {
    return new Date(date).toDateString();
  }

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
      dataDispatch({ type: "deleteOneEntry", id: entry._id });
    } else {
      alert("something went wrong");
    }
  }

  return (
    <div
      className="px-2 rounded-md my-2 flex justify-between bg-slate-200"
      onClick={() => {
        console.log("expand this entry");
      }}
    >
      <li>
        <h3>{entry.heading}</h3>
        <p className="font-extralight text-sm">{readableDate(entry.date)}</p>
      </li>
      <div className="flex">
        <p
          className="bg-black my-0 h-2/3 px-2 mt-2 text-white font-thin rounded-lg border-slate-400 mx-2 text-xl cursor-pointer"
          onClick={() => navigate(`/diary/${entry._id}`)}
        >
          Edit
        </p>
        <p
          className="bg-black my-0 h-2/3 px-2 mt-2 text-white font-thin rounded-lg border-slate-400  text-xl cursor-pointer"
          onClick={() => handelDelete()}
        >
          Delete
        </p>
      </div>
    </div>
  );
}
