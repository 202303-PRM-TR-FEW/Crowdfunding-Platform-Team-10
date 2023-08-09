import React from "react";
import CustomizedProgressBars from "./ProgressBar";
import { useTranslations } from "next-intl";

export function formatNumber(number) {
  const suffixes = ["", "K", "M", "B", "T"];
  const numString = number.toString();
  const numDigits = numString.length;
  const suffixNum = Math.floor((numDigits - 1) / 3);

  if (suffixNum === 0 || numDigits <= 4) {
    return number.toString();
  } else {
    let shortNumber = parseFloat(
      (number / Math.pow(1000, suffixNum)).toPrecision(3)
    );
    if (shortNumber % 1 !== 0) {
      shortNumber = shortNumber.toFixed(1);
    }
    return shortNumber + suffixes[suffixNum];
  }
}
function Target({ raised = "0", goal = "0" }) {
  const formattedGoal = formatNumber(goal || 0);
  const formattedRise = formatNumber(raised || 0);
  const t = useTranslations("Helper");
  
  return (
    <div>
      <CustomizedProgressBars goal={goal} raised={raised} />
      <div className="flex flex-row justify-between my-3">
        <div className="text-center">
          <h4 className="text-[15px] text-[#8a8a8a]">{t("raised")}:</h4>
          <p className=" color-yellow">${formattedRise}</p>
        </div>
        <div className="text-center">
          <h4 className="text-[15px] text-[#8a8a8a]">{t("goal")}:</h4>
          <p className=" color-green">${formattedGoal}</p>
        </div>
      </div>
    </div>
  );
}

export default Target;
