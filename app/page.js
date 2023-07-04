"use client";
import React, { useState } from "react";
import ProjectForm from "./components/ProjectForm";
const Home = () => {
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const handleNewProject = () => {
    openProjectForm === false
      ? setOpenProjectForm(true)
      : setOpenProjectForm(false);
  };

  return (
    <div>
      Home
      <br />
      <button className="p-4 border-2" onClick={handleNewProject}>
        New Project
      </button>
      <ProjectForm
        openProjectForm={openProjectForm}
        setOpenProjectForm={setOpenProjectForm}
      />
    </div>
  );
};

export default Home;
