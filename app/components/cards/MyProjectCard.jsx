/* eslint-disable @next/next/no-img-element */
import React from "react";

import ClassTwoToneIcon from "@mui/icons-material/ClassTwoTone";
import CustomizedProgressBars from "../helper/ProgressBar";
import { Avatar } from "@material-tailwind/react";
import CustomizedTooltip from "../helper/Tooltips";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import eyeIcon from "../../../public/assets/images/eye.png";

export default function MyProjectCard({ project }) {
  const styles = {
    header: "header-2 text-lightGreen py-4",
    flex: "flex items-center gap-1",
    image: "w-full overflow-hidden rounded",
    rightSide: " flex flex-col gap-4 p-2",
    cost: "grid grid-cols-2 pt-2 gap-2",
    avatar: "border-[1px] border-basicgray w-10 h-10 bg-[#00c1a23d]",
  };

  const { formatNumber } = useAuth();
  const formattedViewCount = formatNumber(project?.viewCount || 0);
  const formattedGoal = formatNumber(project?.goal || 0);
  const formattedRise = formatNumber(project?.raised || 0);
  return (
    <>
      <div className="flex flex-col gap-6 py-4 ">
        <div>
          <img
            src={project.url}
            alt="Project of the week"
            className="image-animated w-full"
          />
        </div>

        <div className={styles.rightSide}>
          <h3 className="header-3 ">{project.name}</h3>
          <p className="sub-header">{project.about}</p>
          <CustomizedProgressBars progressValue={60} />
          <div className={styles.cost}>
            <div>
              <h4 className="sub-header ">Raised:</h4>
              <CustomizedTooltip mode="dark" title={formattedRise}>
                <h3 className="header-3 ellipsis-text">${formattedRise}</h3>
              </CustomizedTooltip>
            </div>
            <div>
              <h4 className="sub-header">Goal:</h4>
              <CustomizedTooltip mode="dark" title={formattedGoal}>
                <h3 className="header-3 ellipsis-text">${formattedGoal}</h3>
              </CustomizedTooltip>
            </div>
          </div>
          <div className={`${styles.flex} justify-between py-3`}>
            <div className="">
              <div>
                <ClassTwoToneIcon color="action" />
              </div>
              <p className="text-base text-basicgray ">{project.category}</p>
            </div>
            <li className="flex gap-3 items-center ">
              <h3 className=" color-green text-sm">{formattedViewCount}</h3>
              <Image src={eyeIcon} alt="eye" width={20} height={20} />
            </li>
          </div>
        </div>
      </div>
    </>
  );
}
