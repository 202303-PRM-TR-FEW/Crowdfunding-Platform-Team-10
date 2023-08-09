"use client";
import React, { useEffect, useState } from "react";
import Link from "next-intl/link";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { Box } from "@mui/system";
import SummaryCard from "@/components/cards/SummaryCard";
import Image from "next/image";

function Page({ params }) {
  const { loading, projects, setLoading } = useAuth();
  const [usersProjects, setUsersProjects] = useState([]);

  const t = useTranslations("Cards");

  useEffect(() => {
    setLoading(true);
    const projectArray = Object.values(projects);
    const projectWithUser = projectArray.filter(
      (project) => project.creator.userId === params.id
    );
    setUsersProjects(projectWithUser);
    setLoading(false);
  }, []);

  const user = usersProjects.length > 0 ? usersProjects[0].creator : null;
  const numProjects = usersProjects.length;

  const allProjects = usersProjects ? (
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
      <div className="container mx-auto py-28 text-center">
        {user && (
          <div className="mb-6">
            <Image
              src={user.userImg}
              alt={`${user.name}'s Profile`}
              className="w-20 h-20 rounded-full mx-auto mb-2"
              width={100}
              height={100}
            />
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-gray-500">{numProjects} Projects</p>
          </div>
        )}
        <div className=" items-start justify-around mx-auto flex flex-wrap gap-3 mt-2 ">
          {allProjects}
        </div>
      </div>
    </div>
  );
}

export default Page;
