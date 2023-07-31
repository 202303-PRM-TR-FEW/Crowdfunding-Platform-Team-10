import React from "react";
import CustomizedProgressBars from "./ProgressBar";
import { useAuth } from "@/context/AuthContext";

function Target({ raised = "0", goal = "0" }) {
  const { formatNumber } = useAuth();

  const formattedGoal = formatNumber(goal || 0);
  const formattedRise = formatNumber(raised || 0);

  return (
    <div>
      <CustomizedProgressBars goal={goal} raised={raised} />
      <div className="flex flex-row justify-between my-3">
        <div className="text-center">
          <h4 className="text-[15px] text-[#8a8a8a]">Raised:</h4>
          <p className=" color-yellow">${formattedRise}</p>
        </div>
        <div className="text-center">
          <h4 className="text-[15px] text-[#8a8a8a]">Goal:</h4>
          <p className=" color-green">${formattedGoal}</p>
        </div>
      </div>
    </div>
  );
}

export default Target;
