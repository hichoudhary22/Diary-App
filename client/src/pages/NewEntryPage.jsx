import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import Calender from "../components/Calender";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDataContext } from "../contexts/DataContext";
import Loading from "../components/Loading";

export default function AddNewDiaryEntry() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [heading, setHeading] = useState("");

  const [{ isLoading }, dispatch] = useDataContext();

  async function handleSave(e) {
    e.preventDefault();

    dispatch({ type: "setIsLoading", isLoading: true });

    if (!content) return alert("setting content is required");
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
    dispatch({ type: "setIsLoading", isLoading: false });

    if (response.status === 200) {
      navigate("/diary");
    } else {
      alert("something went wrong");
    }
  }

  return (
    <div className="flex w-full justify-center">
      {isLoading && <Loading />}
      <Form className="flex flex-col flex-grow gap-2 max-w-[800px]">
        <Button onClick={(e) => handleSave(e)}>Save</Button>
        <Input
          name={"heading"}
          type={"text"}
          value={heading}
          onChange={setHeading}
        />
        <Calender name={"Date"} setDate={setDate} value={date} />
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
