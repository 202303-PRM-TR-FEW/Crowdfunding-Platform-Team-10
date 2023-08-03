"use client";
import React from "react";

import { Transition } from "@headlessui/react";
import { useAuth } from "@/context/AuthContext";
import LoaderStyle from "../helper/LoaderStyle";
import SuccessfulCard from "../cards/SuccessfulCard";

function SuccessfulProjects() {
  const { projects } = useAuth();

  if (!projects || typeof projects !== "object") {
    return <LoaderStyle />;
  }
  const projectsArray = Object.values(projects);
  const filteredProjects = projectsArray.filter(
    (project) => project.raised >= project.goal
  );
  const latestThreeProjects = filteredProjects.slice(0, 3);

  return (
    <section className=" flex items-center justify-center ">
      <div className=" container lg:py-14 lg:px-20 p-3 mx-auto ">
        <div className="mb-10 flex-col flex gap-3">
          <h2 className="header-3 text-center  ">
            Latest
            <span className="color-green mx-3  ">Successful Projects</span>
          </h2>
          <p className="text-sm color-grey py-2 text-center">
            Check out our most recent successful cases
          </p>
        </div>
        <div className="container flex flex-wrap  gap-10 items-start justify-center  lg:h-[850px] h-full">
          {latestThreeProjects.length > 0 ? (
            latestThreeProjects.map((pro) => (
              <SuccessfulCard key={pro.id} project={pro} />
            ))
          ) : (
            <p>No successful projects found Yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SuccessfulProjects;
