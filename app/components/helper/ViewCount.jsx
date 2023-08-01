import Image from "next/image";
import React from "react";
import eyeIcon from "../../../public/assets/images/chart.png";
import { useAuth } from "@/context/AuthContext";

function ViewCount({ viewCount = "322" }) {
  const { formatNumber } = useAuth();

  const formattedViewCount = formatNumber(viewCount || 0);
  return (
    <div className="flex  items-end gap-2  justify-center">
      <h3 className=" color-green text-sm p-0 m-0">{formattedViewCount}</h3>
      <Image src={eyeIcon} alt="eye" width={20} height={20} className="mx-2" />
    </div>
  );
}

export default ViewCount;
