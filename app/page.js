"use client";

import React, { useState } from "react";

import CategoryFiltering from "@/components/category/CategoryFiltering";
import SummaryCard from "./components/cards/SummaryCard";
import DonationForm from "./components/DonationForm";
import ProjectForm from "./components/ProjectForm";
const Home = () => {
  const [openDonationForm, setOpenDonationForm] = useState(false);
  const handleDonationForm = () => {
    openDonationForm === false
      ? setOpenDonationForm(true)
      : setOpenDonationForm(false);
  };
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const handleNewProject = () => {
    openProjectForm === false
      ? setOpenProjectForm(true)
      : setOpenProjectForm(false);
  };
  return (
    <div>
      Home
      <button onClick={handleDonationForm}>open</button>
      <button onClick={handleNewProject}>open</button>
      {/* <CategoryFiltering />
      <SummaryCard /> */}
      {/* <DonationForm
        openDonationForm={openDonationForm}
        setOpenDonationForm={setOpenDonationForm}
      /> */}
      <ProjectForm
        openProjectForm={openProjectForm}
        setOpenProjectForm={setOpenProjectForm}
      />
    </div>
  );
};

export default Home;
