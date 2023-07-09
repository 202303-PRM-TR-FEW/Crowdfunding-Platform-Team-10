"use client";
import { useState } from "react";
import ProjectForm from "@/components/forms/ProjectForm";
import { Button } from "@mui/material";

const Profile = ({ user }) => {
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const handleNewProject = () => {
    openProjectForm === false
      ? setOpenProjectForm(true)
      : setOpenProjectForm(false);
  };

  return (
    <>
      <Button onClick={handleNewProject}>New Project</Button>
      <ProjectForm
        authUser={user}
        openProjectForm={openProjectForm}
        setOpenProjectForm={setOpenProjectForm}
      />
    </>
  );
};

export default Profile;
