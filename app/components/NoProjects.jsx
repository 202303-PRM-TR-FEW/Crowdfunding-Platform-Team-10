"use client";

import React, { useState } from "react";
import handImag from "../../public/assets/images/hand.png";
import Image from "next/image";
import Link from "next-intl/link";
import ProjectForm from "@/components/forms/ProjectForm";
import { Button } from "@mui/material";
import LoaderStyle from "./helper/LoaderStyle";
import { useAuth } from "@/context/AuthContext";
const AddProjectButton = ({ user }) => {
  const [openProjectForm, setOpenProjectForm] = useState(false);

  const handleNewProject = () => {
    setOpenProjectForm(!openProjectForm);
  };

  return (
    <>
      <Button onClick={handleNewProject} variant="filled" color="blue-gray">
        New Project
      </Button>
      <ProjectForm
        authUser={user}
        openProjectForm={openProjectForm}
        setOpenProjectForm={setOpenProjectForm}
      />
    </>
  );
};

export const NoProjects = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoaderStyle />;
  }
  return (
    <div className="flex flex-col items-center justify-center text-center w-full">
      <Image
        width={295}
        height={165}
        src={handImag}
        alt="Picture of thanking"
        className={styles.image}
        style={styles.image_size}
      />

      <div>
        <h4 className={styles.title}>You Have No Projects Yet</h4>

        <div className="flex lg:flex-row flex-col w-full items-center justify-center gap-5 mt-5 ">
          <AddProjectButton user={user} />
          <Link
            href="/"
            className=" bg-orange-500 text-white px-4 py-2 rounded"
          >
            Make A Donation
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  image: `w-3/4 mx-auto scale-75`,
  image_size: {
    minHeight: "300px",
  },
  title: `lg:text-6xl text-3xl font-bold mb-4`,

  button_left: `bg-black hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md border border-black mx-5 mb-5 w-80 text-lg`,
  button_right: `bg-white hover:bg-orange-500 text-black font-bold py-2 px-4 rounded-md border border-black mx-5 w-80 text-lg`,
};
