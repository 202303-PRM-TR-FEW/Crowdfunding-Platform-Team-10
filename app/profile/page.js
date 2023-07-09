"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Profile from "./Prolfile";
import { FundContext } from "../context/FundContext";
import SummaryCard from "@/components/cards/SummaryCard";
import Link from "next/link";
import { Box } from "@mui/material";

const Page = () => {
  const { user } = useAuth();
  const { projects } = useContext(FundContext);
  const [usersProjects, setUsersProjects] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [router, user]);

  //get this user data
  useEffect(() => {
    const projectArray = Object.values(projects);
    if (user) {
      const projectWithUser = projectArray.filter(
        (project) => project.creator.userId === user.uid
      );

      if (projectWithUser.length > 0) {
        setUsersProjects(...usersProjects, projectWithUser);
      } else {
        console.log("This user have no projects ");
      }
    }
  }, [projects]);

  const userProject = usersProjects
    ? usersProjects.map((project) => (
        <Box
          key={project.id}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          <Link href={`/${project.id}`}>
            <SummaryCard
              img={project.url}
              title={project.name}
              raised={project.raised}
              goal={project.goal}
            />
          </Link>
        </Box>
      ))
    : "u have no projects";

  return (
    <div>
      {userProject}
      <Profile user={user} />
    </div>
  );
};

export default Page;
