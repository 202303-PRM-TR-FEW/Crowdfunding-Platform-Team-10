import Image from "next/image";
import React from "react";
import eyeIcon from "../../../public/assets/images/chart.png";
import { useAuth } from "@/context/AuthContext";

function ViewCount({ viewCount = "322" }) {
  const { formatNumber } = useAuth();

  const formattedViewCount = formatNumber(viewCount || 0);
  return (
    <div>
      <li className="flex gap-3 items-end   justify-center">
        <h3 className=" color-green text-sm">{formattedViewCount}</h3>
        <Image src={eyeIcon} alt="eye" width={20} height={20} />
      </li>
    </div>
  );
}

export default ViewCount;
