"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import ProjectForm from "./forms/ProjectForm";

const Profile = () => {
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const handleNewProject = () => {
    openProjectForm === false
      ? setOpenProjectForm(true)
      : setOpenProjectForm(false);
  };
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
      <br />
      <button onClick={handleNewProject}>New Project</button>
      <ProjectForm
        user={user}
        openProjectForm={openProjectForm}
        setOpenProjectForm={setOpenProjectForm}
      />
    </>
  );
};

export default Profile;
