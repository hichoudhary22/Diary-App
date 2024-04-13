import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

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
      alert("both password does not match");
      return;
    }

    const newUser = { name: userName, email, password };
    try {
      const response = await fetch(`${serverRootUrl}/user/signUp`, {
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
    <div className="flex justify-center items-center h-5/6">
      <Form
        method="POST"
        className="flex flex-col lg:w-2/5 gap-2 border-2 rounded-xl px-6 py-10 bg-slate-200 "
      >
        <div className="flex">
          <label
            className="w-2/4 mx-2 text-xl font-semibold"
            htmlFor="userName"
          >
            User Name
          </label>
          <input
            className="rounded-md w-3/4"
            type="text"
            name="userName"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex">
          <label className="w-2/4 mx-2 text-xl font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md w-3/4"
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex">
          <label
            className="w-2/4 mx-2 text-xl font-semibold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="rounded-md w-3/4"
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex">
          <label
            className="w-2/4 mx-2 text-xl font-semibold"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="rounded-md w-3/4"
            type="text"
            name="confirmPassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-black text-white rounded-lg mt-5 p-4 border-slate-400 text-xl"
          onClick={(e) => handelRegister(e)}
        >
          Register
        </button>
      </Form>
    </div>
  );
}
