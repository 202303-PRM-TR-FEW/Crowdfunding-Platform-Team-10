"use client";
// import { useRouter } from "next/navigation";

import { useContext } from "react"; // import to use our main context
import { FundContext } from "../context/FundContext"; // our main context
import CategoryFiltering from "@/components/category/CategoryFiltering";
import SummaryCard from "@/components/cards/SummaryCard";
import Link from "next/link";
import ProjectOfTheWeek from "@/components/ProjectOfTheWeek";

const Projects = () => {
  // Your page component code here
  const { projects } = useContext(FundContext); //get our data from our main context
  console.log(projects);
  const projectsArray = Object.values(projects);

  const myProjects = projectsArray.map((project) => (
    <div key={project.id}>
      <Link
        href={{
          pathname: "/projects/${project.id}",
          query: {
            name: `${project.name}`,
            creator: `${project.creator.name}`,
            about: `${project.about}`,
            raised: `${project.raised}`,
            goal: `${project.goal}`,
            endingDate: `${project.endingDate}`,
            startingDate: `${project.startingDate}`,
            category: `${project.category}`,
            url: `${project.url}`,
          },
        }}
      >
        <SummaryCard
          img={project.url}
          title={project.name}
          raised={project.raised}
          goal={project.goal}
        />
      </Link>
    </div>
  ));

  return (
    <div>
      <ProjectOfTheWeek />
      <CategoryFiltering />
      <div>{myProjects}</div>
    </div>
  );
};

export default Projects;
