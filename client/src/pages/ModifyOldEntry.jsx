import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import Input from "../components/Input";
import Calender from "../components/Calender";
import Button from "../components/Button";

export default function ModifyOldEntry() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [{ diaryEntries }, dispatch] = useDataContext();
  const modify = diaryEntries.filter((diaryEntry) => diaryEntry._id === id)[0];
  const [heading, setHeading] = useState(modify?.heading);
  const [date, setDate] = useState(
    new Date(modify?.date).toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [content, setContent] = useState(modify?.content);

  async function handleSave(e) {
    e.preventDefault();

    if (!content) return alert("content feild can not be empty");

    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
    const url = `${serverRootUrl}/diary`;

    const singleEntry = {
      ...modify,
      heading,
      date,
      content,
    };

    dispatch({ type: "setIsLoading", isLoading: true });
    try {
      const response = await fetch(url, {
        method: "PUT",
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
    <div className="flex-col md:flex md:flex-row gap-4">
      <Form className="flex flex-col flex-grow">
        <Button onClick={(e) => handleSave(e)}>Save</Button>
        <Input
          name={"heading"}
          type={"text"}
          value={heading}
          onChange={setHeading}
        />
        <Calender name={"Date"} value={date} setDate={setDate} />
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
