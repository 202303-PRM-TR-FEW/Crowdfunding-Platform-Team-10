/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomizedProgressBars from "../helper/ProgressBar";
import ClassTwoToneIcon from "@mui/icons-material/ClassTwoTone";
import { Avatar } from "@material-tailwind/react";

const SummaryCard = ({ img, title, raised, goal, category, creator }) => {
  const styles = {
    flex: "flex items-center gap-1",
    card:
      "flex flex-col self-stretch gap-3 w-[350px] rounded mb-10  drop-shadow-sm  hover:drop-shadow-3xl  hover:bg-white transition-all duration-300 ease-in-out",
    image: "w-[350px] h-[175px] image-animated",
    body: "p-3 flex flex-col gap-y-2 ",
    avatar: "border-[1px] border-basicgray w-10 h-10 bg-[#00c1a23d]",
  };
  const pregresBar = Math.ceil((raised / goal) * 100);
  return (
    <div className={styles.card}>
      <div className="overflow-hidden rounded">
        <img className={styles.image} src={img} alt="project img" />
      </div>
      <div className={`${styles.flex} px-1`}>
        <div>
          <ClassTwoToneIcon color="action" />
        </div>
        <p className="text-base text-basicgray">{category}</p>
      </div>
      <div className={styles.body}>
        <h4 className="header-4 min-h-[64px] ">{title}</h4>
        <CustomizedProgressBars progressValue={pregresBar} />
        <div className="flex flex-row justify-between">
          <div>
            <h4 className="sub-header">Raised:</h4>
            <p className="header-4">${raised}</p>
          </div>
          <div>
            <h4 className="sub-header">Goal:</h4>
            <p className="header-4">${goal}</p>
          </div>
        </div>
        <div className={`${styles.flex} py-2`}>
          <Avatar alt={creator?.userName} src={""} className={styles.avatar} />
          <p className="text-base text-basicgray ">{creator?.userName}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
