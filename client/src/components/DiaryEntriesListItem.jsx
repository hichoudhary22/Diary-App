import { useNavigate } from "react-router-dom";
import Button from "./Button";
import PopUp from "./PopUp";
import { useState } from "react";

export default function DiaryEntriesListItem({ entry }) {
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);

  const { _id, heading, date, content } = entry;

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
    <div>
      {showPopUp && (
        <PopUp
          id={_id}
          setShowPopUp={setShowPopUp}
          heading={heading}
          date={date}
          content={content}
        />
      )}
      <div
        className="px-2 rounded-md my-2 flex justify-between items-center bg-slate-200"
        onClick={() => setShowPopUp(true)}
      >
        <li className="flex flex-col h-14 w-full">
          <div className="flex justify-between flex-grow">
            <h3 className="text-xl font-semibold">
              {heading.substring(0, 20)}
            </h3>
            <p className="font-extralight text-sm">
              {new Date(date).toDateString()}
            </p>
          </div>
          <p className="overflow-x-hidden">{content}</p>
        </li>
      </div>
    </div>
  );
}
