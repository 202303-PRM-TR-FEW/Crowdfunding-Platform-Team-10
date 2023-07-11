"use client";
import { useContext, useEffect, useState } from "react";
import ProjectOfTheWeek from "./components/cards/ProjectOfTheWeek";
import { FundContext } from "./context/FundContext";
import CategoryFiltering from "./components/category/CategoryFiltering";
import SummaryCard from "./components/cards/SummaryCard";
import { Box } from "@mui/material";
import LoaderStyle from "./components/helper/LoaderStyle";
import Link from "next/link";

const Home = () => {
  const { projects } = useContext(FundContext);

  const [data, setData] = useState(projects ?? []);
  const [projectOfWeek, setProjectOFWeek] = useState("");
  useEffect(() => {
    setData(projects);
  }, [projects]);

  // Find project with maximum contributions
  useEffect(() => {
    let max = 0;
    if (data.length > 0) {
      data.forEach((project) => {
        if (project.raised > max) {
          max = project.raised;
          setProjectOFWeek(project); // Update the projectOfWeek variable
        }
      });
    }
  });

  //projects mapping
  const allProjects =
    data.length > 0 ? (
      data.map((card) => {
        return (
          <Link
            key={card.id}
            href={`/${card.id}`}
          >
            <SummaryCard
              key={card.id}
              img={card.url}
              title={card.name}
              raised={card.raised}
              goal={card.goal}
            />
          </Link>
        );
      })
    ) : (
      <Box className="scale-[0.6]">
        <LoaderStyle />
      </Box>
    );

  return (
    <div className="p-5 md:p-7 lg:p-10">
      <Link key={projectOfWeek.id} href={`/${projectOfWeek.id}`}>
        <ProjectOfTheWeek projectOfWeek={projectOfWeek} />
      </Link>
      <CategoryFiltering data={projects} filtrindData={setData} />
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allProjects}
      </Box>
    </div>
  );
};

export default Home;
