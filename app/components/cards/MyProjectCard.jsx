import React from "react";

import CustomizedProgressBars from "../helper/ProgressBar";
import { Typography } from "@material-tailwind/react";

export default function MyProjectCard({ projectOfWeek }) {
  const styles = {
    page: `grid grid-cols-1 gap-1 lg:gap-5 items-center`,
  };
  return (
    

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
  
  );
}
