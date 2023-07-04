"use client";
import React, { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import DonationForm from "./components/DonationForm";

const Home = () => {
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const [openDonationForm, setOpenDonationForm] = useState(false);

  const handleNewProject = () => {
    openProjectForm === false
      ? setOpenProjectForm(true)
      : setOpenProjectForm(false);
  };
  const handleDonationForm = () => {
    openDonationForm === false
      ? setOpenDonationForm(true)
      : setOpenDonationForm(false);
  };

  return (
    <div>
      Home
      <br />
      <button className="p-4 border-2" onClick={handleNewProject}>
        New Project
      </button>
      <button className="p-4 border-2" onClick={handleDonationForm}>
        Donation
      </button>
      <ProjectForm
        openProjectForm={openProjectForm}
        setOpenProjectForm={setOpenProjectForm}
      />
      <DonationForm
        openDonationForm={openDonationForm}
        setOpenDonationForm={setOpenDonationForm}
      />
    </div>
  );
};

export default Home;
