/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next-intl/client";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import Link from "next-intl/link";
import MyProjectCard from "@/components/cards/MyProjectCard";
import TransactionHistory from "@/components/cards/TransactionHistory";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { NoProjects } from "@/components/NoProjects";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import { useTranslations } from "next-intl";
import PleaseLogin from "@/components/PleaseLogin";
import { Fade } from "react-awesome-reveal";
const Page = () => {
  const { user, loading, projects } = useAuth();
  const [usersProjects, setUsersProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const t = useTranslations("Profile");

  useEffect(() => {
    if (user && user.email) {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );

      const fetchUserData = async () => {
        try {
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();

            setCurrentUser({ ...userData, id: user.uid });
          } else {
            console.log("no data matched");
            setCurrentUser({});
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };

      fetchUserData();
    }
  }, [user]);
  const router = useRouter();
  const circleBackgroundStyle = {
    position: "absolute",
    top: "-50px",
    right: "50px",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "#00c1a1a5",
    transform: "rotate(45deg)",
    zIndex: -1,
    animation: `moveCircle2 10s linear infinite`,
    overFlow: "hidden",
  };
  useEffect(() => {
    setTimeout(() => {
      if (user === null) {
        router.push("/login");
        console.log(user);
      } else {
        const projectArray = Object.values(projects);
        const projectWithUser = projectArray.filter(
          (project) => project.creator.userId === user.uid
        );
        setUsersProjects(projectWithUser);
        setIsLoading(false);
        console.log(user);
      }
    }, 600);
  }, [projects]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.country === "" || currentUser.bio === "") {
        router.push("/account");
      }
    }
  }, []);

  if (loading && user !== null) {
    return <LoaderStyle />;
  }

  return (
    <div className=" bg-gradient-to-t from-transparent to-teal-50 relative overflow-hidden ">
      <Fade>
        {user === null ? (
          <PleaseLogin />
        ) : (
          <>
            <div className="container mx-auto py-28">
              {isLoading ? (
                <LoaderStyle />
              ) : usersProjects.length > 0 ? (
                <>
                  <h1 className="header-2 text-center lg:text-start text-lightGreen">
                    {t("header")}
                  </h1>
                  <div className="flex flex-col lg:flex-row py-6 md:py-10 gap-8 ">
                    <div className="w-full lg:w-7/12">
                      <div className="flex flex-col gap-10 ">
                        {usersProjects.map((project, i) => {
                          return (
                            <Link
                              key={i}
                              className="grid"
                              href={`/projects/${project?.id}`}
                            >
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
            <div style={circleBackgroundStyle}></div>
          </>
        )}
      </Fade>
    </div>
  );
};

export default Page;
