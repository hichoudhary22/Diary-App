import { useNavigate } from "react-router-dom";
import readableDate from "../utils/readableDate";
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
        className="pl-2 rounded-md my-2 flex justify-between items-center bg-slate-200"
        onClick={() => setShowPopUp(true)}
      >
        <li className="flex flex-col h-14">
          <div className="flex justify-between flex-grow">
            <h3 className="text-xl font-semibold">{heading}</h3>
            <p className="font-extralight text-sm">{readableDate(date)}</p>
          </div>
          <p className="overflow-hidden">{content}</p>
        </li>
      </div>
    </div>
  );
}
