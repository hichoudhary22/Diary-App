import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import CustomForm from "../components/CustomForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handelLogin(e) {
    e.preventDefault();

    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;

    const userInfo = {
      email,
      password,
    };
    const response = await fetch(`${serverRootUrl}/user/login`, {
      method: "POST",
      withCredntials: true, //this line did not make any difference in receiving cookie
      credentials: "include", //this however allowed to capture cookie
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(userInfo),
    });

    if (response.status === 200) {
      navigate("/diary");
    } else {
      alert("something went wrong");
    }
  }
  return (
    <div className="flex justify-center items-center h-5/6">
      <CustomForm>
        <Input name={"email"} type={"text"} value={email} onChange={setEmail} />
        <Input
          name={"password"}
          type={"password"}
          value={password}
          onChange={setPassword}
        />
        <button
          className="bg-black text-white rounded-lg my-2 p-4 border-slate-400 text-xl font-bold"
          onClick={(e) => {
            handelLogin(e);
          }}
        >
          Login
        </button>
      </CustomForm>
    </div>
  );
}
