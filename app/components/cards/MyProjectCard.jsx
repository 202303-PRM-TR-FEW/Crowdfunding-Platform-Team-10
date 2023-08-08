/* eslint-disable @next/next/no-img-element */
import React from "react";
import Target from "@/components/helper/Target";
import ViewCount from "@/components/helper/ViewCount";
import UserNameImg from "@/components/helper/UserNameImg";
import CategoryIcon from "@/components/helper/CategoryIcon";
import SuccessBadge from "@/components/SuccessBadge";
import Image from "next/image";

export default function MyProjectCard({ project }) {
  const styles = {
    header: "header-2 text-lightGreen py-4",
    flex: "flex items-center gap-1",
    image: "w-full overflow-hidden rounded",
    rightSide: "w-full flex flex-col gap-4",
    cost: "grid grid-cols-2 pt-2 gap-2",
    avatar: "border-[1px] border-basicgray w-10 h-10 bg-[#00c1a23d]",
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6 overflow-hidden p-4 md:p-0 rounded-lg">
        <div className="overflow-hidden rounded-lg relative w-[326px] h-[222px] sm:w-[660px] sm:h-[390px] md:h-[554px] lg:h-[366px] xl:h-[554px] md:w-full cursor-pointer">
          <Image
            src={project.url}
            alt="Project of the week"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={styles.rightSide}>
          <div className="flex justify-between items-center">
            <div className="flex  justify-center gap-2 items-center">
              <h1 className="header-3 text-center my-2 lg:text-start text-lightGreen ">
                {project.name}
              </h1>
              <div className="mt-3">
                <CategoryIcon category={project.category} />
              </div>
            </div>

            <SuccessBadge
              endingDate={project.left}
              raised={project.raised}
              goal={project.goal}
            />
          </div>
          <Target raised={project.raised} goal={project.goal} />
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
