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
    <section className=" felx items-center justify-center ">
      <div className=" container lg:py-14 lg:px-20 p-3 mx-auto ">
        <div className="mb-10 felx-col gap-3">
          <h2 className="header-3 text-center  ">
            Latest
            <span className="color-green mx-3  ">Successful Projects</span>
          </h2>
          <p className="text-sm color-grey  py-2 text-center">
            Check out our most recent successful cases
          </p>
        </div>
        <div className="container  grid lg:gap-2 gap-10 lg:grid-cols-3 items-start justify-center lg:h-[600px]">
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
