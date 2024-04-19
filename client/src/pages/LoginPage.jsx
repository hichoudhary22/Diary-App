import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import CustomForm from "../components/CustomForm";
import Button from "../components/Button";
import { useDataContext } from "../contexts/DataContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ auth }, dispatch] = useDataContext();
  const navigate = useNavigate();

  async function handelLogin(e) {
    e.preventDefault();

    if (!email || !password) return alert("please enter all the details");

    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;

    const userInfo = {
      email: email.toLowerCase(),
      password,
    };

    dispatch({ type: "setIsLoading", isLoading: true });
    try {
      const response = await fetch(`${serverRootUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredntials: true, //this line did not make any difference in receiving cookie
        credentials: "include", //this however allowed to capture cookie
        mode: "cors",
        body: JSON.stringify(userInfo),
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
    <div className="flex justify-center items-center h-5/6">
      {auth && <Navigate to={"/diary"} />}
      <CustomForm>
        <Input name={"email"} type={"text"} value={email} onChange={setEmail} />
        <Input
          name={"password"}
          type={"password"}
          value={password}
          onChange={setPassword}
        />
        <Button
          onClick={(e) => {
            handelLogin(e);
          }}
        >
          Login
        </Button>
      </CustomForm>
    </div>
  );
}
