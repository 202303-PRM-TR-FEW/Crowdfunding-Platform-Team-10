"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [router, user]);
  console.log(user);
  // Move the text variable inside the return statement
  return (
    <>
      {user
        ? `You are logged in as >>>> NAME: ${user.displayName}
 -------
   Email is ${user.email}
    
    `
        : null}
    </>
  );
};

export default Profile;
