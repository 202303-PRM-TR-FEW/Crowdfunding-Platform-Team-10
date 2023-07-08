"use client";
import { useState } from "react";
import ProjectForm from "@/components/forms/ProjectForm";


const Profile = ({ user }) => {
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const handleNewProject = () => {
    openProjectForm === false
      ? setOpenProjectForm(true)
      : setOpenProjectForm(false);
  };

  return (
    <>
    
      <button onClick={handleNewProject}>New Project</button>
      <ProjectForm
        authUser={user}
        openProjectForm={openProjectForm}
        setOpenProjectForm={setOpenProjectForm}
      />
    </>
  );
};

export default Profile;
