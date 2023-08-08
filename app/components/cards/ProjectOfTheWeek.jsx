/* eslint-disable @next/next/no-img-element */
import React from "react";

import { Avatar } from "@mui/material";

import Link from "next-intl/link";

import SuccessBadge from "../SuccessBadge";
import Target from "../helper/Target";
import ViewCount from "../helper/ViewCount";
import CategoryIcon from "../helper/CategoryIcon";
import Image from "next/image";

function ProjectOfTheWeek({ projectOfWeek }) {
  return (
    <>
      <h1 className={styles.header}>Project of the week</h1>
      <div className={styles.page}>
        <div className={styles.leftSize}>
          <Link key={projectOfWeek.id} href={`/${projectOfWeek.id}`}>
            <div className="w-[326px] h-[222px] sm:w-[660px] sm:h-[390px] lg:w-[539px] lg:h-[314px] relative rounded-lg overflow-hidden ">
              <Image
                unoptimized
                src={projectOfWeek.url}
                alt="Project of the week"
                fill={true}
                style={{ objectFit: "cover" }}
                className="  image-animated"
                sizes="(max-width: 768px) 100vw"
              />
            </div>
          </Link>
        </div>
        <div className={styles.rightSide}>
          <div className=" justify-self-start">
            <SuccessBadge
              endingDate={projectOfWeek.endingDate}
              raised={projectOfWeek.raised}
              goal={projectOfWeek.goal}
            />
          </div>

          <div className="  flex justify-between">
            <h3 data-cy="project-name" className="header-3 text-start">
              {projectOfWeek.name}
            </h3>
            <div className="flex justify-end">
              <CategoryIcon
                category={projectOfWeek.category}
                color={"#f0bd07"}
              />
            </div>
          </div>

          <p
            data-cy="project-about"
            className="text-base text-basicgray line-clamp-3 "
          >
            {projectOfWeek.about}
          </p>
          <Target raised={projectOfWeek.raised} goal={projectOfWeek.goal} />

          <div className={`${styles.flex} justify-between  `}>
            <div className={styles.flex}>
              <Avatar
                alt={projectOfWeek.creator?.userName}
                src={projectOfWeek.creator?.userImg}
                className="w-10 h-10 me-1 overflow-hidden"
              />
              <p className="text-base text-basicgray ">
                {projectOfWeek.creator?.userName}
              </p>
            </div>
            <ViewCount viewCount={projectOfWeek.viewCount} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectOfTheWeek;

const styles = {
  header: "header-2 text-lightGreen px-2 py-4",
  page: `flex lg:flex-row flex-col gap-4 px-2 py-5 items-center justify-start`,
  flex: "flex items-center gap-1",
  leftSize:
    " w-full overflow-hidden rounded-lg flex justify-center lg:justify-between",
  rightSide: " w-full flex flex-col gap-4",
  cost: "grid grid-cols-2 pt-2 gap-2",
  avatar: "border-[1px] border-basicgray w-10 h-10 bg-[#00c1a23d]",
};
