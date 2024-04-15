import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import CustomForm from "../components/CustomForm";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handelRegister(e) {
    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;

    e.preventDefault();
    if (!userName || !email || !password) {
      alert("please provide all the details");
      return;
    }
    if (password !== confirmPassword) {
      alert("both password should match");
      return;
    }

    const newUser = { name: userName, email, password };
    try {
      const response = await fetch(`${serverRootUrl}/user/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
        withCredentials: true,
        credentials: "include",
      });
      const result = await response.json();

      if (response.status === 200) {
        navigate("/diary");
      } else {
        alert(result.message);
      }
    } catch (er) {
      alert("something went wrong, try again");
    }
  }

  return (
    <div className="flex justify-center items-center h-[90%]">
      <CustomForm>
        <Input
          name={"User Name"}
          type={"text"}
          value={userName}
          onChange={setUserName}
        />
        <Input name={"email"} type={"text"} value={email} onChange={setEmail} />
        <Input
          name={"password"}
          type={"password"}
          value={password}
          onChange={setPassword}
        />
        <Input
          name={"confirm password"}
          type={"password"}
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <button
          className="bg-black text-white rounded-lg mt-5 p-4 border-slate-400 text-xl"
          onClick={(e) => handelRegister(e)}
        >
          Register
        </button>
      </CustomForm>
    </div>
  );
}
