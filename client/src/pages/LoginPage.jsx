import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import CustomForm from "../components/CustomForm";
import Button from "../components/Button";
import { useDataContext } from "../contexts/DataContext";
import Loading from "../components/Loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ auth, isLoading }, dispatch] = useDataContext();
  const navigate = useNavigate();

  async function handelLogin(e) {
    e.preventDefault();

    dispatch({ type: "setIsLoading", isLoading: true });

    const serverRootUrl = import.meta.env.VITE_SERVER_ROOT_URL;
    const userInfo = {
      email: email.toLowerCase(),
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

    dispatch({ type: "setIsLoading", isLoading: false });

    if (response.status === 200) {
      dispatch({ type: "setAuth", auth: true });
      navigate("/diary");
    } else {
      alert("something went wrong");
    }
  }
  return (
    <div className="flex justify-center items-center h-5/6">
      {auth && <Navigate to={"/diary"} />}
      {isLoading && <Loading />}
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
