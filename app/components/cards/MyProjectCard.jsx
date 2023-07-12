import React from "react";

import CustomizedProgressBars from "../helper/ProgressBar";
import { Typography } from "@material-tailwind/react";

export default function MyProjectCard({ projectOfWeek }) {
  const styles = {
    page: `grid grid-cols-1 gap-1 lg:gap-5 items-center`,
  };
  return (
    <div className="p-4">
      <div className="w-full flex items-center justify-between">
        <Typography variant="h1" className="mb-4">
          My Projects
        </Typography>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>

      <div className={styles.page}>
        <div className="w-full lg:h-[300px]">
          <img
            src={projectOfWeek.url}
            alt="My Projects"
            className="w-full object-cover object-top"
          />
        </div>

        <Typography variant="h4">{projectOfWeek.name}</Typography>

        <div className="grid grid-cols-1 gird-rows-2">
          <CustomizedProgressBars progressValue={60} className="mb-2" />
          <div className="flex justify-between my-2">
            <div className="text-left ">
              <Typography variant="paragraph" color="blue-gray">
                Raised:{" "}
              </Typography>

              <Typography variant="h3">${projectOfWeek.raised} </Typography>
            </div>
            <div className="text-left ">
              <Typography variant="paragraph" color="blue-gray">
                Goal:{" "}
              </Typography>

              <Typography variant="h3">${projectOfWeek.goal} </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
