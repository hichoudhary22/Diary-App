import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

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
      <Form
        method="POST"
        className="flex flex-col w-4/5 sm:w-2/3 lg:w-[700px] gap-5 border-2 rounded-xl px-6 py-10 bg-slate-200"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xl font-semibold" htmlFor="email">
            EMAIL
          </label>
          <input
            name="email"
            className=" text-xl rounded-md px-2 py-2"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xl font-semibold" htmlFor="password">
            PASSWORD
          </label>
          <input
            name="password"
            className=" text-xl rounded-md px-2 py-2"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-black text-white rounded-lg my-2 p-4 border-slate-400 text-xl font-bold"
          onClick={(e) => {
            handelLogin(e);
          }}
        >
          Login
        </button>
      </Form>
      {/* </div> */}
    </div>
  );
}
