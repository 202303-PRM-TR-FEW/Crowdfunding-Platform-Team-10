import { Avatar } from "@mui/material";
import Target from "../helper/Target";
import Image from "next/image";

function SuccessfulCard({ project }) {
  return (
    <div
      className="group flex-col mx-auto w-[300px] bg-white bg-opacity-20 px-3 pt-3 
    hover:pb-3 pb-4 backdrop-blur-md rounded-lg shadow-lg cursor-pointer
    transition-all duration-400  ease-out
    "
    >
      <Image
        unoptimized
        src={project.url}
        className="w-full  object-cover lg:h-[250px]"
        alt="project img"
        width={300}
        height={250}
      />

      <div className="pt-2 px-2 pb-0">
        <h4 className="color-green text-md my-3">{project.name}</h4>
        <Target goal={project.goal} raised={project.raised} />
        <div className="hidden group-hover:block  ">
          <p
            data-cy="card-about"
            className="text-[#63727e] my-2 text-sm max-h-20 overflow-hidden 
            transition-all duration-700  ease-out
          "
          >
            {project.about}
          </p>
          <hr className="border-t border-white my-2"></hr>
          <div className="flex items-center justify-start gap-2 ">
            <div className="w-[30px]">
              <Avatar
                src={project?.creator?.userImg}
                alt="user img"
                sx={{ width: 30, height: 30, mr: 1 }}
              />
            </div>
            <div>
              <p className="text-md color-yellow">
                {project?.creator?.userName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessfulCard;
