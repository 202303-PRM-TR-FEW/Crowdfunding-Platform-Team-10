"use client";
import React from "react";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";
import LoaderStyle from "../helper/LoaderStyle";
import SuccessfulCard from "../cards/SuccessfulCard";
import { useAuth } from "@/context/AuthContext";

function SuccessfulProjects() {
  const { projects } = useAuth();

  const t = useTranslations("SuccessfulProjects");

  if (!projects || typeof projects !== "object") {
    return <LoaderStyle />;
  }
  const projectsArray = Object.values(projects);
  const filteredProjects = projectsArray.filter(
    (project) => project.raised >= project.goal
  );
  const latestThreeProjects = filteredProjects.slice(0, 3);

  return (
    <section className=" felx items-center justify-center ">
      <div className=" container lg:py-14 lg:px-20 p-3 mx-auto ">
        <div className="mb-10 felx-col gap-3">
          <h2 className="header-3 text-center  ">
            {t("header-part-one")}
            <span className="color-green mx-3  ">{t("header-part-two")}</span>
          </h2>

          <p className="text-sm color-grey py-2 text-center">
            {t("sub-header")}
          </p>
        </div>
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-10 items-start justify-center lg:h-[600px]">
          {latestThreeProjects.length > 0 ? (
            latestThreeProjects.map((pro) => (
              <Link key={pro.id} href={`/projects/${pro.id}`}>
                <SuccessfulCard project={pro} />
              </Link>
            ))
          ) : (
            <p>{t("no-projects-text")}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SuccessfulProjects;
