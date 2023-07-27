"use client";
import React, { useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
import { useAuth } from "@/context/AuthContext";
import LoaderStyle from "../helper/LoaderStyle";

function BestProjects() {
  const { projects } = useAuth();
  const [data, setData] = useState(projects ?? []);

  useEffect(() => {
    setData(projects);
  }, [projects]);

  const allProjects = projects ? (
    data.length > 0 ? (
      // Group projects into sets of 3
      data
        .reduce((acc, project, index) => {
          const groupIndex = Math.floor(index / 3);
          if (!acc[groupIndex]) {
            acc[groupIndex] = [];
          }
          acc[groupIndex].push(project);
          return acc;
        }, [])
        .map((projectGroup, groupIndex) => {
          return (
            <div
              className="flex items-center justify-center gap-3"
              key={groupIndex}
            >
              {projectGroup.map((project) => (
                <div
                  key={project.id}
                  className="w-80 h-[300px] rounded-md overflow-hidden shadow-lg m-2"
                  style={{
                    backgroundImage: `url(${project.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h3 className="text-white text-xl font-semibold">
                    {project.name}
                  </h3>
                </div>
              ))}
            </div>
          );
        })
    ) : (
      <div className="header-4 px-10">No Projects Yet</div>
    )
  ) : (
    <div className="scale-[0.6]">
      <LoaderStyle />
    </div>
  );
  const allProjectsPhone = projects ? (
    data.length > 0 ? (
      data.map((project) => {
        return (
          <div className="flex items-center justify-center" key={project.id}>
            <div
              className="w-80 h-[300px] rounded-md overflow-hidden shadow-lg m-2"
              style={{
                backgroundImage: `url(${project.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3 className="text-white text-xl font-semibold">
                {project.name}
              </h3>
            </div>
          </div>
        );
      })
    ) : (
      <div className="header-4 px-10">No Projects Yet</div>
    )
  ) : (
    <div className="scale-[0.6]">
      <LoaderStyle />
    </div>
  );
  return (
    <section className="container mx-auto lg:py-28 p-2">
      <h3 className="header-3 text-center mb-20">Our Latest Projects</h3>
      {/* <Carousel> */}
      {/* {allProjectsPhone} */}
      projects slider
      {/* </Carousel> */}
    </section>
  );
}

export default BestProjects;
