"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Profile from "./Prolfile"

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [router, user]);
  console.log(user);

  return (
    <div>
      {" "}
      <Profile user={user} />
    </div>
  );
};

export default Page;
