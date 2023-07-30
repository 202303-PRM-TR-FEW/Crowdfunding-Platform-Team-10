"use client";
import React from "react";

import { Transition } from "@headlessui/react";
import Target from "../helper/Target";
import { useAuth } from "@/context/AuthContext";
import LoaderStyle from "../helper/LoaderStyle";

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
              <Card key={pro.id} project={pro} />
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

function Card({ project }) {
  return (
    <div className="group flex-col w-[300px] bg-white bg-opacity-20 px-3 pt-3 hover:pb-3 pb-0 backdrop-blur-md rounded-lg shadow-lg cursor-pointer">
      <img
        src={project.url}
        className="w-full  object-cover lg:h-[250px]"
        alt="project img"
      />

      <div className="pt-2 px-2 pb-0">
        <h4 className="color-green text-md my-3">{project.name}</h4>
        <Target goal={project.goal} raised={project.raised} />
        <div className="hidden group-hover:block transition-all ease-in-out duration-700">
          <p className="text-[#8a8a8a] my-2 text-sm">{project.about}</p>
          <hr className="border-t border-white my-2"></hr>
          <div className="flex items-center justify-start gap-2 ">
            <div className="w-[30px]">
              <img
                src={project?.creator?.userImg}
                alt="user img"
                className="rounded-full w-full"
              />
            </div>
            <div>
              <p className="text-md color-yellow">
                {project?.creator?.userName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
