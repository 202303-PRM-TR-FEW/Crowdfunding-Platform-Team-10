"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Signup = () => {
  const inputStyle =
    "shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";
  const formStyle = "w-full max-w-sm m-10";

  const router = useRouter();

  const { user, signup } = useAuth();

  const [err, setErr] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("")
    try {
      await signup(data.email, data.password);
      router.push("/profile");
    } catch (e) {
      setErr(e.message);
      console.log(e.message);
    }

    console.log("im data" + data);
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup} className={formStyle}>
        <div>
          <label>Email address</label>
          <input
            className={inputStyle}
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className={inputStyle}
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
          />
        </div>

        <button type="submit">Signup</button>
      </form>
      <p>
        {err}
      </p>
    </div>
  );
};

export default Signup;
