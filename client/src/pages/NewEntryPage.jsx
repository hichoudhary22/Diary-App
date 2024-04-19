import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import Calender from "../components/Calender";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDataContext } from "../contexts/DataContext";

export default function AddNewDiaryEntry() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [heading, setHeading] = useState("");

  const [, dispatch] = useDataContext();

  async function handleSave(e) {
    e.preventDefault();

    if (!content) return alert("setting content is required");

    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
    const url = `${serverRootUrl}/diary`;

    const singleEntry = { heading, content, date };

    dispatch({ type: "setIsLoading", isLoading: true });
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(singleEntry),
      });
      const data = await response.json();
      dispatch({ type: "setIsLoading", isLoading: false });

      if (response.status === 200) {
        navigate("/diary");
      } else {
        alert(data.message);
      }
    } catch (er) {
      alert(er.message);
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
