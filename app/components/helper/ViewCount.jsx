import Image from "next/image";
import React from "react";
import eyeIcon from "../../../public/assets/images/chart.png";

function ViewCount({ viewCount = "322" }) {
  const formattedViewCount = formatNumber(viewCount || 0);
  return (
    <div className="flex  items-end gap-1 -ml-4  justify-center">
      <h3 className=" color-green text-sm p-0 m-0">{formattedViewCount}</h3>
      <Image src={eyeIcon} unoptimized alt="eye" width={20} height={20} className="mx-2" />
    </div>
  );
}

export default ViewCount;
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
