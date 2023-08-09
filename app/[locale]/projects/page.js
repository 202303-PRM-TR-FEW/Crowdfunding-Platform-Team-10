"use client";
import { useEffect, useState } from "react";
import SummaryCard from "@/components/cards/SummaryCard";
import { Box } from "@mui/material";
import ProjectOfTheWeek from "@/components/cards/ProjectOfTheWeek";
import CategoryFiltering from "@/components/category/CategoryFiltering";
import LoaderStyle from "@/components/helper/LoaderStyle";

import Link from "next-intl/link";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/config/firebase";

const Home = () => {
  const [projectOfWeek, setProjectOFWeek] = useState("");
  const [projects, setProjects] = useState(true);
  useEffect(() => {
    const q = query(collection(db, "projects"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let projectsArr = [];
      QuerySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });
      setProjects(projectsArr);
      console.log("im projects UseEffect");
    });
    return () => unsubscribe();
  }, []);
  const [data, setData] = useState(projects ?? []);

  useEffect(() => {
    setData(projects);
  }, [projects]);
  useEffect(() => {
    let max = 0;

    if (projects.length > 0) {
      projects.forEach((project) => {
        if (project.viewCount > max && project.goal > project.raised) {
          max = project.viewCount;
          setProjectOFWeek(project);
        } else if (project.viewCount > max) {
          max = project.viewCount;
          setProjectOFWeek(project);
        }
      });
    }
  });

  //projects mapping
  const allProjects = projects ? (
    data.length > 0 ? (
      data.map((card) => {
        return (
          <Link href={`/projects/${card.id} `} key={card.id}>
            <SummaryCard
              key={card.id}
              img={card.url}
              title={card.name}
              goal={card.goal}
              raised={card.raised}
              category={card.category}
              creator={card.creator}
              viewCount={card.viewCount}
              endingDate={card.endingDate}
            />
          </Link>
        );
      })
    ) : (
      <Box className="header-4 px-10 py-28">No Projects In This Category</Box>
    )
  ) : (
    <Box className="scale-[0.6]">
      <LoaderStyle />
    </Box>
  );

  return (
    <section className="bg-[#fcfcfe] flex-col items-start justify-center">
      <div className=" bg-gradient-to-t from-transparent to-teal-50">
        <div className="container mx-auto pt-28 p-3">
          <ProjectOfTheWeek projectOfWeek={projectOfWeek} />
        </div>
      </div>
      <div className="container mx-auto p-3">
        <CategoryFiltering data={projects} filtrindData={setData} />
        <div className=" items-start justify-around mx-auto flex flex-wrap gap-3 mt-2 ">
          {allProjects}
        </div>
      </div>
    </section>
  );
};

export default Home;
