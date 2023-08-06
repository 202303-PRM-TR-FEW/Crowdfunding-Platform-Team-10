"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next-intl/link";
import ProjectForm from "@/components/forms/ProjectForm";
import LoaderStyle from "./helper/LoaderStyle";
import { useAuth } from "@/context/AuthContext";
import P1 from "../../public/assets/images/P_P1.png";
import P2 from "../../public/assets/images/P_P2.png";
import P3 from "../../public/assets/images/P_P3.png";
import P4 from "../../public/assets/images/P_P4.png";

const AddProjectButton = ({ user }) => {
  const [openProjectForm, setOpenProjectForm] = useState(false);

  const handleNewProject = () => {
    setOpenProjectForm(!openProjectForm);
  };

  return (
    <>
      <button onClick={handleNewProject} className="btn-primary">
        New Project
      </button>
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
    <div>
      <section className="grid justify-items-center py-6">
        <div className="group justify-items-center grid grid-cols-1 pt-10 container px-5 md:px-0">
          <div className="grid grid-cols-4 justify-center flex-wrap scale-[0.8] mx-auto max-h-72 ">
            <Image
              className="relative w-auto h-auto xl:group-hover:translate-x-[7rem] group-hover:translate-x-[5rem] transition duration-700"
              src={P1}
              alt="piece1"
            />
            <Image
              className="relative w-auto h-auto xl:group-hover:translate-x-[2rem] group-hover:translate-x-[1.5rem] md:group-hover:translate-x-[1rem] transition duration-700"
              src={P2}
              alt="piece2"
            />
            <Image
              className="relative w-auto h-auto xl:group-hover:-translate-x-[2rem] group-hover:-translate-x-[2rem] transition duration-700 z-10"
              src={P3}
              alt="piece3"
            />
            <Image
              className="relative w-auto h-auto xl:group-hover:-translate-x-[6rem] group-hover:-translate-x-[5rem] transition duration-700"
              src={P4}
              alt="piece4"
            />
          </div>
          <div className="pt-10 flex flex-col text-center justify-items-center col-span-1 w-4/5 group/edit ">
            <p className="header-1 text-center">
              You do not have{" "}
              <span className="color-yellow">a project yet</span>{" "}
            </p>
            <p className="sub-header pt-10 mx-auto justify-center text-justify">
              If there is already a project in your mind, let us realize it as
              well since it would give someone a lift and may put a smile on
              your face as a gift!
            </p>
            <div className="flex lg:flex-row flex-col w-full items-center justify-center gap-5 mt-10 ">
              <AddProjectButton user={user} />
              <Link href="/projects" className="btn-yellow">
                Make A Donation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
