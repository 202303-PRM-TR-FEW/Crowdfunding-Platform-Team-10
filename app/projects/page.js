"use client";
import { useContext } from "react"; // import to use our main context
import { FundContext } from "../context/FundContext"; // our main context
import CategoryFiltering from "@/components/category/CategoryFiltering";
import SummaryCard from "@/components/cards/SummaryCard";
import { ProjectInfo } from "@/components/ProjectInfo";

const Projects = () => {
  // Your page component code here

  const { users, projects } = useContext(FundContext); //get our data from our main context

  console.log(users);
  console.log(projects);
  return (
    <div>
      {projects.map((project) => (
      <ProjectInfo
        key={project.id}
        title={project.name}
        owner={project.creator}
        about={project.about}
        taken={project.raised}
        goal={project.goal}
        left={project.endingDate}
      />
    ))}


    </div>
  );
};

export default Projects;


//<CategoryFiltering />
//<SummaryCard />
