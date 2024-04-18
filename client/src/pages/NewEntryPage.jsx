import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import Calender from "../components/Calender";
import Input from "../components/Input";
import Button from "../components/Button";

export default function AddNewDiaryEntry() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [heading, setHeading] = useState("");

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
    <div className="flex w-full justify-center">
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
