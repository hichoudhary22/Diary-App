import { Form, useNavigate } from "react-router-dom";
import Calender from "./Calender";
import { useState } from "react";
import calenderImg from "../assets/calender.png";

export default function AddNewDiaryEntry() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [heading, setHeading] = useState("");

  const [showCalender, setShowCalender] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
    const url = `${serverRootUrl}/diary/newEntry`;
    const singleEntry = { heading, content, date };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(singleEntry),
    });

    if (response.status === 200) {
      navigate("/diary");
    } else {
      alert("something went wrong");
    }
  }

  return (
    <div className="flex-col sm:flex sm:flex-row gap-4">
      <div className="sm:hidden self-end">
        <button
          className="h-8 w-8 sm:h-10 sm:w-10"
          onClick={() => setShowCalender((val) => !val)}
        >
          <img src={calenderImg} />
        </button>
        {showCalender && (
          <div className="fixed right-4 m-4 bg-slate-100 rounded-3xl p-4 bg-opacity-[0.93]">
            <Calender activeDate={date} setActiveDate={setDate} />
          </div>
        )}
      </div>
      <div className="hidden sm:flex flex-grow-0 ">
        <Calender activeDate={date} setActiveDate={setDate} />
      </div>

      <Form className=" flex flex-col flex-grow">
        <div className="flex w-11/12 gap-2">
          <input
            className="w-full text-2xl my-2 px-2 rounded-md"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Heading"
          />
          <button
            className="bg-black text-white rounded-lg my-2 px-4 border-slate-400"
            onClick={(e) => handleSave(e)}
          >
            Save
          </button>
        </div>
        <input
          className="text-2xl my-2 rounded-md w-11/12 px-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
        />
        <p>location picker</p>
        <textarea
          className="text-2xl my-2 rounded-md w-11/12 px-2 text-justify"
          rows="10"
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Content"
        >
          {content}
        </textarea>
      </Form>
    </div>
  );
}
