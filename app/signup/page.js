"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Input } from "@material-tailwind/react";
import {
  setDoc,
  doc,
  collection,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const Signup = () => {
  const inputStyle =
    "shadow appearance-none border border-grey-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";
  const formStyle = "w-full max-w-sm m-10";

  const router = useRouter();

  const { user, signup } = useAuth();
  const [err, setErr] = useState("");
  //auth data
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //db data
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    userImg: "",
    projects:[],
    donations:[]
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await signup(data.email, data.password);
      await setDoc(doc(db, "users", res.user.uid), {
        ...userData,email: data.email ,
        timeStamp: serverTimestamp(),
      });
      
      router.push("/profile");
    } catch (e) {
      setErr(e.message);
      
    }
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

        <Input
          size="lg"
          label="Name"
          type="text"
          onChange={(e) =>
            setUserData({
              ...userData,
              name: e.target.value,
            })
          }
        />
        <br />
        <Input
          size="lg"
          label="Bio"
          type="text"
          onChange={(e) =>
            setUserData({
              ...userData,
              bio: e.target.value,
            })
          }
        />
        <br />

        <Input
          size="lg"
          label="Photo"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setUserData({
              ...userData,
              userImg: e.target.file,
            })
          }
        />

        <button type="submit">Signup</button>
      </form>
      <p>{err}</p>
    </div>
  );
};

export default Signup;
