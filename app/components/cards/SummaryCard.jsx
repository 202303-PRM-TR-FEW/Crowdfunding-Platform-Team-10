"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";

import { Avatar } from "@material-tailwind/react";
import Link from "next-intl/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import SuccessBadge from "../SuccessBadge";
import ViewCount from "../helper/ViewCount";
import Target from "../helper/Target";
import CategoryIcon from "../helper/CategoryIcon";

const SummaryCard = ({
  cardUrl,
  endingDate,
  img,
  title,
  raised,
  goal,
  category,
  creator,
  viewCount,
}) => {
  const { isSuccessful } = useAuth();

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
      } flex flex-col  self-stretch  p-3 shadow-md  bg-opacity-20 backdrop-blur-md rounded-lg hover:rounded-tl-[0px]   hover:-translate-y-3 gap-2 w-[350px]
        mb-10
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
        }  custom-clip-path  justify-center items-center flex opacity-0 hover:opacity-100 `}
      >
        <ViewCount viewCount={viewCount} />
      </div>
      <Link href={`/${cardUrl}`}>
        <div className="overflow-hidden object-contain rounded-lg  cursor-pointer">
          <img
            className="w-full h-[222px] image-animated"
            src={img}
            alt="project img"
          />
        </div>
      </Link>
      <div className={styles.body}>
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-2  items-start mt-2 w-full justify-between">
            <div className=" justify-self-start flex justify-start">
              <h4 className="header-5 text-start text-[#2f2f2f]  overflow-hidden w-full h-7">
                {title}
              </h4>
            </div>
            <div className="flex justify-end">
              <CategoryIcon category={category} color={"#00c1a2"} />
            </div>
          </div>
        </div>

        <Target raised={raised} goal={goal} />

        <hr className=" border-t-2  border-white"></hr>
        {/* <div className={`${styles.flex} justify-between `}>
          <div className={`${styles.flex} `}>
            <Avatar
              alt={creator?.userName}
              src={creator?.userImg}
              className="w-10 h-10 me-1"
            />
            <p className="text-base text-basicgray ">{creator?.userName}</p>
          </div>

          <Link href={`/${cardUrl}`}>
            <div className=" rounded-full  text-center cursor-pointer hover:text-[#f0bd07] transition-all duration-300 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                  fill="#00c1a2"
                />
              </svg>
            </div>
          </Link>
        </div> */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start justify-self-start">
            <div className={`${styles.flex} `}>
              <Avatar
                alt={creator?.userName}
                src={creator?.userImg}
                className="w-10 h-10 me-1 overflow-hidden"
              />
              <p className="text-base text-basicgray ">{creator?.userName}</p>
            </div>
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
