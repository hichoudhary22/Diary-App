import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import CustomForm from "../components/CustomForm";
import Button from "../components/Button";
import { useDataContext } from "../contexts/DataContext";

export default function LoginPage() {
  const [{ auth }, dispatch] = useDataContext();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handelRegister(e) {
    e.preventDefault();
    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
    if (!userName || !email || !password || !confirmPassword) {
      alert("please provide all the details");
      return;
    }
    if (password !== confirmPassword) {
      alert("both password should match");
      return;
    }
    dispatch({ type: "setIsLoading", isLoading: true });

    const newUser = { name: userName, email, password };
    try {
      const response = await fetch(`${serverRootUrl}/user/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      dispatch({ type: "setIsLoading", isLoading: false });
      if (response.status === 200) {
        dispatch({ type: "setAuth", auth: true });
        navigate("/diary");
      } else {
        alert(data.message);
      }
    } catch (er) {
      alert(er.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-[90%]">
      {auth && <Navigate to={"/diary"} />}
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
        <Button onClick={(e) => handelRegister(e)}>Register</Button>
      </CustomForm>
    </div>
  );
}
