"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "./forms/ProjectForm";
import Profile from "@/profile/page";

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [router, user]);
  console.log(user);

  return <>{user ? <Profile /> : null}</>;
};

export default Page;
