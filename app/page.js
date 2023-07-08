"use client";
import { useContext, useEffect, useState } from "react";
import ProjectOfTheWeek from "./components/ProjectOfTheWeek";
import { FundContext } from "./context/FundContext";
import CategoryFiltering from "./components/category/CategoryFiltering";
import SummaryCard from "./components/cards/SummaryCard";
import { Box } from "@mui/material";
import LoaderStyle from "./components/helper/LoaderStyle";

const Home = () => {
  const { projects } = useContext(FundContext);
  const [data, setData] = useState(projects ?? []);
  useEffect(() => {
    setData(projects);
  }, [projects]);

  console.log(data);
  return (
    <>
      <ProjectOfTheWeek />
      <CategoryFiltering data={projects} filtrindData={setData} />
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.length > 0 ? (
          data.map((card) => {
            return (
              <SummaryCard
                key={card.id}
                img={card.url}
                title={card.title}
                raised={card.raised}
                goal={card.goal}
              />
            );
          })
        ) : (
          <Box className="scale-[0.6]">
            <LoaderStyle />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
