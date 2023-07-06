"use client";
import { useContext } from "react"; // import to use our main context
import { FundContext } from "../context/FundContext"; // our main context
import CategoryFiltering from "@/components/category/CategoryFiltering";
import SummaryCard from "@/components/cards/SummaryCard";

const Projects = () => {
  // Your page component code here

  const { users, projects } = useContext(FundContext); //get our data from our main context

  console.log(users);
  console.log(projects);
  return (
    <div>
      <CategoryFiltering />
      <SummaryCard />
    </div>
  );
};

export default Projects;
