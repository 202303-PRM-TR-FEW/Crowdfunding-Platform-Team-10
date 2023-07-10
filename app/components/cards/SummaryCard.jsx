import React from "react";
import CustomizedProgressBars from "../helper/ProgressBar";

const SummaryCard = ({ img, title, raised, goal }) => {
  const pregresBar = Math.ceil((raised / goal) * 100);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-10">
      <div className="flex flex-col self-stretch gap-3 w-[295px]">
        <img className="w-[295px] h-[175px]" src={img} alt="project img" />
        <h4 fontFamily="Krona One" className="header-4 min-h-[64px]">
          {title}
        </h4>
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
      </div>
    </div>
  );
};

export default SummaryCard;
