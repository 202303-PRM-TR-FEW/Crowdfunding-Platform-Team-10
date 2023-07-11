"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FundContext } from "../context/FundContext";
import Link from "next/link";

import MyProjectCard from "@/components/cards/MyProjectCard";
import TransactionHistory from "@/components/cards/TransactionHistory";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { NoProjects } from "@/components/NoProjects";

const Page = () => {
  const { user, loading } = useAuth();
  const { projects } = useContext(FundContext);
  const [usersProjects, setUsersProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setUsersProjects(projectWithUser);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("This user has no projects.");
      }
    }
  }, [user, projects]);

  //take the last project and show it in Project Card
  const oneProjectInfo = usersProjects[usersProjects.length - 1];

  if (loading && user !== null) {
    return <LoaderStyle />;
  }

  return (
    <div className="px-2 lg:px-20 p-5 md:p-7 lg:p-10">
      {isLoading ? (
        <LoaderStyle />
      ) : oneProjectInfo ? (
        <div className="lg:grid-cols-3 grid-cols-1 grid lg:gap-36 w-full justify-between items-start">
          <div className="lg:col-span-2">
            <Link href={`/${oneProjectInfo.id}`} key={oneProjectInfo.id}>
              <MyProjectCard projectOfWeek={oneProjectInfo} />
            </Link>
          </div>

          <div className="lg:col-span-1">
            <TransactionHistory />
          </div>
        </div>
      ) : (
        <NoProjects />
      )}
    </div>
  );
};

export default Page;
