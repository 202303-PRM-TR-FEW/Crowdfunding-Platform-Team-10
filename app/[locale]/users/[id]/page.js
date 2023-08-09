"use client";

import React, { useEffect, useState } from "react";

import Link from "next-intl/link";

import LoaderStyle from "@/components/helper/LoaderStyle";

import { useAuth } from "@/context/AuthContext";

import { useTranslations } from "next-intl";
import { Box } from "@mui/system";
import SummaryCard from "@/components/cards/SummaryCard";

function Page({ params }) {
  console.log(params);
  const { user, loading, projects } = useAuth();
  const [usersProjects, setUsersProjects] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (user === null) {
        // router.push("/login");
        console.log(user);
      } else {
        const projectArray = Object.values(projects);
        const projectWithUser = projectArray.filter(
          (project) => project.creator.userId === params.id
        );
        setUsersProjects(projectWithUser);
        setIsLoading(false);
        console.log(user);
      }
    }, 600);
  }, [projects]);

  const allProjects = projects ? (
    usersProjects.length > 0 ? (
      usersProjects.map((card) => {
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
      <Box className="header-4 px-10 py-28">{t("message")}</Box>
    )
  ) : (
    <Box className="scale-[0.6]">
      <LoaderStyle />
    </Box>
  );

  console.log(allProjects);
  if (loading) {
    return (
      <Box className="scale-[0.6]">
        <LoaderStyle />
      </Box>
    );
  }
  return (
    <div className=" bg-gradient-to-t from-transparent to-teal-50 relative overflow-hidden ">
      <div className="container mx-auto py-28">{allProjects}</div>
    </div>
  );
}

export default Page;
