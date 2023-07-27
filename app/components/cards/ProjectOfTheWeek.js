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

export default function ProjectOfTheWeek({ projectOfWeek }) {
  const { formatNumber } = useAuth();
  const formattedViewCount = formatNumber(projectOfWeek?.viewCount || 0);
  const formattedGoal = formatNumber(projectOfWeek?.goal || 0);
  const formattedRise = formatNumber(projectOfWeek?.raised || 0);
  const pregresBar = Math.ceil(
    (projectOfWeek.raised / projectOfWeek.goal) * 100
  );
  return (
    <>
      <h1 className={styles.header}>Project of the week</h1>
      <div className={styles.page}>
        <Link key={projectOfWeek.id} href={`/${projectOfWeek.id}`}>
          <div className={styles.image}>
            <img
              src={projectOfWeek.url}
              alt="Project of the week"
              className="image-animated"
            />
          </div>
        </Link>
        <div className={styles.rightSide}>
          <div className={`${styles.flex} justify-between p-3`}>
            <div className="">
              <div>
                <ClassTwoToneIcon color="action" />
              </div>
              <p className="text-base text-basicgray ">
                {projectOfWeek.category}
              </p>
            </div>
            <li className="flex gap-3 items-center ">
              <h3 className=" color-green text-sm">{formattedViewCount}</h3>
              <Image src={eyeIcon} alt="eye" width={20} height={20} />
            </li>
          </div>
          <h3 className="header-3">{projectOfWeek.name}</h3>
          <p className="sub-header">{projectOfWeek.about}</p>
          <CustomizedProgressBars progressValue={pregresBar} />
          <div className={styles.cost}>
            <div>
              <CustomizedTooltip mode="dark" title={formattedRise}>
                <h3 className="header-3 ellipsis-text">${formattedRise}</h3>
              </CustomizedTooltip>
              <h4 className="sub-header ">Raised:</h4>
            </div>
            <div>
              <CustomizedTooltip mode="dark" title={formattedGoal}>
                <h3 className="header-3 ellipsis-text">${formattedGoal}</h3>
              </CustomizedTooltip>

              <h4 className="sub-header">Goal:</h4>
            </div>
          </div>
          <div className={styles.flex}>
            <Avatar
              alt={projectOfWeek?.creator?.userName}
              src={projectOfWeek?.creator?.userImg}
              className={styles.avatar}
            />
            <p className="text-base text-basicgray ">
              {projectOfWeek?.creator?.userName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  header: "header-2 text-lightGreen  py-4",
  page: `grid grid-cols-1 lg:grid-cols-2 gap-10 py-5 items-center min-h-[470px]`,
  flex: "flex items-center gap-1",
  image: "w-full overflow-hidden rounded",
  rightSide: "w-10/12 flex flex-col gap-4",
  cost: "grid grid-cols-2 pt-2 gap-2",
  avatar: "border-[1px] border-basicgray w-10 h-10 bg-[#00c1a23d]",
};
