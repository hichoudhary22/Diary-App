import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import Calender from "../components/Calender";
import calenderImg from "../assets/calender.png";
import Input from "../components/Input";

export default function AddNewDiaryEntry() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [heading, setHeading] = useState("");

  const [showCalender, setShowCalender] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
    const url = `${serverRootUrl}/diary`;
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

      <Form className="flex flex-col flex-grow">
        <button
          className="bg-black text-white rounded-lg my-2 px-4 border-slate-400"
          onClick={(e) => handleSave(e)}
        >
          Save
        </button>
        <Input
          name={"heading"}
          type={"text"}
          value={heading}
          onChange={setHeading}
        />
        <Input name={"date"} type={"text"} value={date} onChange={setDate} />
        <p>location picker</p>
        <Input
          name={"content"}
          type={"textArea"}
          value={content}
          onChange={setContent}
        />
      </Form>
    </div>
  );
}
