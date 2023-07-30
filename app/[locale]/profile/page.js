/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next-intl/client";

import { doc, deleteDoc } from "firebase/firestore";
import Link from "next-intl/link";
import MyProjectCard from "@/components/cards/MyProjectCard";
import TransactionHistory from "@/components/cards/TransactionHistory";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { NoProjects } from "@/components/NoProjects";
import { useAuth } from "@/context/AuthContext";
import ConfirmDialog from "@/components/helper/ConfirmDialog";
import { db } from "@/config/firebase";
import { toast } from "react-toastify";

const Page = () => {
  const { user, loading, projects, currentUser } = useAuth();
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
  }, [projects]); // added projects as a dependency so that it runs whenever 'projects' changes.

  useEffect(() => {
    if (currentUser) {
      if (currentUser.country === "" || currentUser.bio === "") {
        router.push("/account");
      }
    }
  }, []);
  console.log(usersProjects);
  let oneProjectInfo = null;

  if (!isLoading && usersProjects.length > 0) {
    oneProjectInfo = usersProjects[usersProjects.length - 1];
  }

  if (loading && user !== null) {
    return <LoaderStyle />;
  }

  return (
    ////Needs to stay for future////
    // const handleDeleteProject = () => {
    //   setOpen(true);
    // };

    // const handleClose = async (word) => {
    //   if (word === "Confirm") {
    //     await deleteDoc(doc(db, "projects", oneProjectInfo.id));
    //     toast.success(" Project deleted Succesfully !");
    //   }
    //   setOpen(false);
    // };
    <div className=" bg-gradient-to-t from-transparent to-teal-50">
      <div className="container mx-auto py-28">
        {isLoading ? (
          <LoaderStyle />
        ) : usersProjects.length > 0 ? (
          <>
            <h1 className="header-2 text-center lg:text-start text-lightGreen">
              My Projects
            </h1>
            <div className="flex flex-col lg:flex-row py-10 gap-8 ">
              <div className="w-full lg:w-7/12">
                <div className="flex flex-col gap-10 ">
                  {usersProjects.map((project, i) => {
                    return (
                      <Link key={i} className="grid" href={`/${project?.id}`}>
                        <MyProjectCard project={project} />
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="sticky z-50 top-[68px]  overflow-y-auto w-full lg:w-5/12 self-start order-first lg:order-last">
                <div className="max-h-screen  overflow-y-auto">
                  <TransactionHistory usersProjects={usersProjects} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <NoProjects />
        )}
      </div>
    </div>
  );
};

export default Page;
/* <div className="w-full flex items-center justify-between">
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
       className="w-8 h-8 cursor-pointer"
     >
       <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
       />
     </svg>
   </div> */
