"use client";
import React, { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import CategoryFiltering from "@/components/category/CategoryFiltering";
import SummaryCard from "./components/cards/SummaryCard";
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
      <CategoryFiltering />
      <SummaryCard />
    </div>
  );
};

export default Home;
