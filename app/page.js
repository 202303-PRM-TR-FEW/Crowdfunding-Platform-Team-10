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
  const allProjects = projects ? (
    data.length > 0 ? (
      data.map((card) => {
        return (
          <Link key={card.id} href={`/${card.id}`}>
            <div className="relative">
              {/* <div className="absolute top-[10px] left-[10px] w-24 h-24 bg-green-100 rounded-full z-[-1]"></div> */}

              <SummaryCard
                key={card.id}
                img={card.url}
                title={card.name}
                raised={card.raised}
                goal={card.goal}
              />
              <div className="absolute bottom-[20px] right-[30px] w-56 h-56 bg-green-100 rounded-full z-[-1]"></div>
            </div>
          </Link>
        );
      })
    ) : (
      <Box className="header-4 px-10">No Projects In This Category</Box>
    )
  ) : (
    <Box className="scale-[0.6]">
      <LoaderStyle />
    </Box>
  );

  return (
    <div className="py-5 md:py-7 lg:py-10 ">
      <div className="relative ">
      <div className="absolute top-[20%] left-[50%] w-24 h-24 bg-green-100 rounded-full z-[-1]"></div>

        <div className="backdrop-blur-lg bg-opacity-20 rounded-[30px] shadow-sm border-5 p-4 bg-white ">
          <Link key={projectOfWeek.id} href={`/${projectOfWeek.id}`}>
            <ProjectOfTheWeek projectOfWeek={projectOfWeek} />
          </Link>
        </div>
          <div className="absolute bottom-[-70px] right-[-40px] w-96 h-96 bg-green-100 rounded-full z-[-1]"></div>
      </div>

      <CategoryFiltering data={projects} filtrindData={setData} />
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allProjects}
      </Box>
    </div>
  );
};

export default Home;
