"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FundContext } from "../context/FundContext";
import Link from "next/link";
import ProjectForm from "@/components/forms/ProjectForm";
import { Button } from "@mui/material";
import MyProjectCard from "@/components/cards/MyProjectCard";
import TransactionHistory from "@/components/cards/TransactionHistory";
import LoaderStyle from "@/components/helper/LoaderStyle";

const Profile = ({ user }) => {
  const [openProjectForm, setOpenProjectForm] = useState(false);

  const handleNewProject = () => {
    setOpenProjectForm(!openProjectForm);
  };

  return (
    <>
      <Button onClick={handleNewProject}>New Project</Button>
      <ProjectForm
        authUser={user}
        openProjectForm={openProjectForm}
        setOpenProjectForm={setOpenProjectForm}
      />
    </>
  );
};

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

  useEffect(() => {
    const projectArray = Object.values(projects);
    if (user) {
      const projectWithUser = projectArray.filter(
        (project) => project.creator.userId === user.uid
      );

      if (projectWithUser.length > 0) {
        setUsersProjects(...usersProjects, projectWithUser);
      } else {
        console.log("This user has no projects.");
      }
    }
  }, [user, projects, usersProjects]);

  //take the last project and show it in Project Card
  const oneProjectInfo = usersProjects[usersProjects.length - 1];

  return (
    <div className="px-2 lg:px-20 p-5 md:p-7 lg:p-10">
      <div className="lg:grid-cols-3 grid-cols-1 grid lg:gap-36 justify-between items-start">
        <div className="lg:col-span-2 ">
          {oneProjectInfo !== undefined ? (
            <Link href={`/${oneProjectInfo.id}`} key={oneProjectInfo.id}>
              <MyProjectCard projectOfWeek={oneProjectInfo} />
            </Link>
          ) : (
            <LoaderStyle />
          )}
          <Profile user={user} />
        </div>
        <div className="lg:col-span-1 ">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default Page;
