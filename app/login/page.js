"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Login = () => {
  const inputStyle =
    "shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";
  const formStyle = "w-full max-w-sm m-10";

  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(data.email, data.password);
      router.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className={formStyle}>
        <h1 className="text-lg my-5">Login</h1>
        <div>
          <label>Email address</label>
          <input
            className={inputStyle}
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email}
            required
            type="email"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            className={inputStyle}
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
            required
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white my-2 py-1 px-2 rounded"
        >
          Login
        </button>
      <p>Dont have an account? 
        <Link href="/signup" className="underline">Sign up</Link>
      </p>
      </form>
    </div>
  );
};

export default Login;
