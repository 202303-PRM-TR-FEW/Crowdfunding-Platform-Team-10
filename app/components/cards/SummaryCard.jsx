"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";

import { Avatar } from "@mui/material";
import SuccessBadge from "../SuccessBadge";
import ViewCount from "../helper/ViewCount";
import Target from "../helper/Target";
import CategoryIcon from "../helper/CategoryIcon";
import Image from "next/image";
import Link from "next-intl/link";

const SummaryCard = ({
  endingDate,
  img,
  title,
  raised,
  goal,
  category,
  creator,
  viewCount,
  key
}) => {
  function isSuccessful(endingDate, raised, goal) {
    const endDate = new Date(endingDate);
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (raised >= goal) {
      return "Successful";
    } else if (daysRemaining <= 0) {
      return "Closed";
    } else if (daysRemaining < 5) {
      return `${daysRemaining} Days Left`;
    } else {
      return "Active";
    }
  }
  const successState = isSuccessful(endingDate, raised, goal);
  const styles = {
    flex: "flex items-center gap-1",
    card: "flex flex-col border-[1px] border-[#0000002d] self-stretch  bg-white bg-opacity-80 hover:-translate-y-3 gap-3 w-[410px] rounded mb-10  drop-shadow-sm  hover:drop-shadow-3xl  transition-all duration-300 ease-in-out",
    body: " flex flex-col gap-y-2 ",
    avatar: "  w-10 h-10  ",
    button: `bg-black hover:bg-orange-800 lg:hover:scale-[1.8] origin-left transform transition duration-500 hover:scale-[1.2] text-white font-bold py-2 px-4 rounded-md border border-black mt-8 w-80 text-center ms-0 md:w-100`,
  };

  ``;

  return (
    <div
      className={` ${
        successState === "Successful"
          ? "bg-[#00c1a10e]"
          : successState.length > 10
          ? "bg-[#be21211d]"
          : successState === "Closed"
          ? "bg-[#4b4b4b1d]"
          : "bg-[#ffffffb7]"
      } flex flex-col self-stretch p-3 shadow-md bg-opacity-20 backdrop-blur-md rounded-lg
       hover:rounded-tl-[0px] hover:-translate-y-3 gap-2 w-[300px] md:w-[350px]
        mb-20
          hover:drop-shadow-3xl relative  transition-all duration-300 ease-in-out
          hover-parent
          `}
    >
      <div
        className={` ${
          successState === "Successful"
            ? "bg-[#00c1a10e]"
            : successState.length > 10
            ? "bg-[#be21211d]"
            : successState === "Closed"
            ? "bg-[#4b4b4b1d]"
            : "bg-[#ffffffb7]"
        }  custom-clip-path items-start opacity-0 hover:opacity-100 `}
      >
        <ViewCount viewCount={viewCount} />
      </div>

      <div className="overflow-hidden  rounded-lg relative h-[222px] w-full cursor-pointer">
        <Image
          unoptimized
          fill={true}
          style={{ objectFit: "cover" }}
          className="  image-animated"
          src={img}
          alt="project img"
          sizes="(max-width: 768px) 100vw"
        />
      </div>

      <div className={styles.body}>
        <Link href={`/projects/${key} `}>
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-2  items-start mt-2 w-full justify-between">
              <div className=" justify-self-start flex justify-start">
                <h4
                  data-cy="card-title"
                  className="header-5 text-start text-[#2f2f2f]  overflow-hidden w-full h-7"
                >
                  {title}
                </h4>
              </div>
              <div className="flex justify-end">
                <CategoryIcon category={category} color={"#00c1a2"} />
              </div>
            </div>
          </div>
        </Link>
        <Target raised={raised} goal={goal} />

        <hr className=" border-t-2  border-white"></hr>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start justify-self-start">
            <Link href={`users/${creator.userId}`}>
              <div className={`${styles.flex} `}>
                <Avatar
                  alt={creator?.userName}
                  src={creator?.userImg}
                  className="w-10 h-10 me-1 overflow-hidden"
                />
                <p className="text-base text-basicgray ">{creator?.userName}</p>
              </div>
            </Link>
          </div>
          <div className=" ">
            <SuccessBadge endingDate={endingDate} raised={raised} goal={goal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
