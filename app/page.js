"use client";
import { useContext, useEffect, useState } from "react";
import ProjectOfTheWeek from "./components/ProjectOfTheWeek";
import { FundContext } from "./context/FundContext";
import CategoryFiltering from "./components/category/CategoryFiltering";
import SummaryCard from "./components/cards/SummaryCard";
import { Box } from "@mui/material";
import LoaderStyle from "./components/helper/LoaderStyle";
import Link from "next/link";

const Home = () => {
  const { projects } = useContext(FundContext);
  const [data, setData] = useState(projects ?? []);
  useEffect(() => {
    setData(projects);
  }, [projects]);

  const allProjects =
    data.length > 0 ? (
      data.map((card) => {
        return (
          <Link
            key={card.id}
            href={{
              pathname: `/${card.id}`,
              query: {
                name: `${card.name}`,
                creator: `${card.creator.name}`,
                about: `${card.about}`,
                raised: `${card.raised}`,
                goal: `${card.goal}`,
                endingDate: `${card.endingDate}`,
                startingDate: `${card.startingDate}`,
                category: `${card.category}`,
                url: `${card.url}`,
              },
            }}
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
    <>
      <ProjectOfTheWeek />
      <CategoryFiltering data={projects} filtrindData={setData} />
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allProjects}
      </Box>
    </>
  );
};

export default Home;
