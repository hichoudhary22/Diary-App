import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import Input from "../components/Input";
import CalendarComponent from "../components/CalendarComponent";
import readableDate from "../utils/readableDate";
import Loading from "../components/Loading";

export default function ModifyOldEntry() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [{ isLoading, diaryEntries }, dispatch] = useDataContext();

  const modify = diaryEntries.filter((diaryEntry) => diaryEntry._id === id)[0];

  const [heading, setHeading] = useState(modify?.heading);
  const [date, setDate] = useState(readableDate(modify?.date));
  const [content, setContent] = useState(modify?.content);

  async function handleSave(e) {
    e.preventDefault();

    dispatch({ type: "setIsLoading", isLoading: true });

    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
    const url = `${serverRootUrl}/diary`;
    const singleEntry = {
      ...modify,
      heading,
      date,
      content,
    };
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(singleEntry),
    });

    dispatch({ type: "setIsLoading", isLoading: false });

    if (response.status === 200) {
      navigate("/diary");
    } else {
      alert("something went wrong");
    }
  }

  return (
    <div className="flex-col md:flex md:flex-row gap-4">
      {isLoading && <Loading />}
      <CalendarComponent />
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
