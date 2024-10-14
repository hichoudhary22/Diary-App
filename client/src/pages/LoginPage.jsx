import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import CustomForm from "../components/CustomForm";
import Button from "../components/Button";
import { useDataContext } from "../contexts/DataContext";
import loginHelper from "../helperFunctions/loginHelper";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, dispatch] = useDataContext();
  const navigate = useNavigate();

  async function handelLogin(e) {
    e.preventDefault();
    if (!email || !password) return alert("please enter all the details");
    const userInfo = {
      email: email.toLowerCase(),
      password,
    };

    dispatch({ type: "setIsLoading", isLoading: true });
    const response = await loginHelper(userInfo);
    const responseJson = await response.json();
    dispatch({ type: "setIsLoading", isLoading: false });

    if (response.status !== 200) {
      alert(responseJson.message);
      return;
    }
    dispatch({ type: "setData", userDiaryData: responseJson });
    navigate("/diary");
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
        <Button onClick={handelLogin}>Login</Button>
      </CustomForm>
    </div>
  );
}
