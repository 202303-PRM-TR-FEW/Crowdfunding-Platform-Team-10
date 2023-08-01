/* eslint-disable @next/next/no-img-element */
import React from "react";

import { Avatar } from "@material-tailwind/react";

import Link from "next-intl/link";

import SuccessBadge from "../SuccessBadge";
import Target from "../helper/Target";
import ViewCount from "../helper/ViewCount";
import CategoryIcon from "../helper/CategoryIcon";
export default function ProjectOfTheWeek({ projectOfWeek }) {
  return (
    <>
      <h1 className={styles.header}>Project of the week</h1>
      <div className={styles.page}>
        <div className={styles.leftSize}>
          <Link key={projectOfWeek.id} href={`/${projectOfWeek.id}`}>
            <img
              src={projectOfWeek.url}
              alt="Project of the week"
              className="image-animated w-full"
            />
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
            <h3 className="header-3 text-start">{projectOfWeek.name}</h3>
            <div className="flex justify-end">
              <CategoryIcon
                category={projectOfWeek.category}
                color={"#f0bd07"}
              />
            </div>
          </div>

          <p className="text-base text-basicgray line-clamp-3 ">
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

const styles = {
  header: "header-2 text-lightGreen px-2 py-4",
  page: `flex lg:flex-row flex-col gap-10 px-2 py-5 items-start  justify-start`,
  flex: "flex items-center gap-1",
  leftSize: " lg:w-[40%] w-full overflow-hidden rounded-lg flex justify-end",
  rightSide: "lg:w-[50%] w-full flex flex-col gap-4",
  cost: "grid grid-cols-2 pt-2 gap-2",
  avatar: "border-[1px] border-basicgray w-10 h-10 bg-[#00c1a23d]",
};