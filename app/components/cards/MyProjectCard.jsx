/* eslint-disable @next/next/no-img-element */
import React from "react";
import Target from "@/components/helper/Target";
import ViewCount from "@/components/helper/ViewCount";
import UserNameImg from "@/components/helper/UserNameImg";
import CategoryIcon from "@/components/helper/CategoryIcon";
import SuccessBadge from "@/components/SuccessBadge";

export default function MyProjectCard({ project }) {
  const styles = {
    header: "header-2 text-lightGreen py-4",
    flex: "flex items-center gap-1",
    image: "w-full overflow-hidden rounded",
    rightSide: " flex flex-col gap-4",
    cost: "grid grid-cols-2 pt-2 gap-2",
    avatar: "border-[1px] border-basicgray w-10 h-10 bg-[#00c1a23d]",
  };

  return (
    <>
      <div className="flex flex-col gap-6 overflow-hidden ">
        <div>
          <img
            src={project.url}
            alt="Project of the week"
            className="image-animated w-full"
          />
        </div>

        <div className={styles.rightSide}>
          <div className="flex justify-between items-center">
            <div className="flex  justify-center gap-2 items-center">
              <h1 className="header-3 text-center my-2 lg:text-start text-lightGreen ">
                {project.name}
              </h1>
              <CategoryIcon category={project.category} />
            </div>

            <SuccessBadge
              endingDate={project.left}
              raised={project.taken}
              goal={project.goal}
            />
          </div>
          <Target raised={project.taken} goal={project.goal} />
          <p className="color-grey">{project.about}</p>
          <hr className="border-t-2 border-white my-2"></hr>

          <div className="flex items-center justify-between">
            <UserNameImg
              userName={project.creator.userName}
              userImg={project.creator.userImg}
            />
            <ViewCount />
          </div>
        </div>
      </div>
    </>
  );
}
