"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FundContext } from "../context/FundContext";
import { doc, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import MyProjectCard from "@/components/cards/MyProjectCard";
import TransactionHistory from "@/components/cards/TransactionHistory";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { NoProjects } from "@/components/NoProjects";
import { Typography } from "@material-tailwind/react";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import ConfirmDialog from "@/components/helper/ConfirmDialog";
const Page = () => {
  const { user, loading } = useAuth();
  const { projects } = useContext(FundContext);
  const [usersProjects, setUsersProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else {
      const projectArray = Object.values(projects);
      const projectWithUser = projectArray.filter(
        (project) => project.creator.userId === user.uid
      );
      setUsersProjects(projectWithUser);
      setIsLoading(false);
    }
  }, [projects, router, user]);
  //take the last project and show it in Project Card
  const oneProjectInfo = usersProjects[usersProjects.length - 1];
  //this handle delete a project
  const handleDeleteProject = () => {
    setOpen(true);
  };
  const handleClose = async (word) => {
    if (word === "Confirm") {
      await deleteDoc(doc(db, "projects", oneProjectInfo.id));
      console.log("item deleted");
    }
    setOpen(false);
  };

  if (loading && user !== null) {
    return <LoaderStyle />;
  }
  return (
    <div className="px-2 lg:px-20 p-5 md:p-7 lg:p-10">
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title={"Are you sure to delete this project?"}
        message={""}
        handleClose={handleClose}
      />
      {isLoading ? (
        <LoaderStyle />
      ) : oneProjectInfo ? (
        <div
          className="lg:grid-cols-3 grid-cols-1 grid lg:gap-36 w-full justify-between items-start"
          key={oneProjectInfo.id}
        >
          <div className="lg:col-span-2">
            <div className="p-4">
              <div className="w-full flex items-center justify-between">
                <Typography variant="h1" className="mb-4">
                  My Projects
                </Typography>
                <svg
                  onClick={handleDeleteProject}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <Link href={`/${oneProjectInfo.id}`}>
                <MyProjectCard projectOfWeek={oneProjectInfo} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <TransactionHistory oneProjectInfo={oneProjectInfo} />
          </div>
        </div>
      ) : (
        <NoProjects />
      )}
    </div>
  );
};

export default Page;
