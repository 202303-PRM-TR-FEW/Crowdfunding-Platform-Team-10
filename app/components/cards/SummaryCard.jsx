import React from "react";
import img1 from "../../../public/assets/images/img1.png";
import img2 from "../../../public/assets/images/img2.png";
import img3 from "../../../public/assets/images/img3.png";
import { Box, LinearProgress, Typography } from "@mui/material";
import Image from "next/image";
import CustomizedProgressBars from "../helper/ProgressBar";

const SummaryCard = ({ img, title, raised, goal }) => {
  return (
  
      <Box className="flex flex-col self-stretch gap-3 w-[295px]">
        <img width={295} height={165} src={img} alt="asdf" objectfit="cover" />
        <Typography
          fontFamily="Krona One"
          className="text-2xl text-BasicBlack min-h-[64px]"
        >
          {title}
        </Typography>
        <CustomizedProgressBars progressValue={70} />
        <Box className="flex flex-row justify-between">
          <Box>
            <Typography
              fontFamily={" Mulish"}
              className="text-lg text-BasicBlack"
            >
              Raised:
            </Typography>
            <Typography
              fontFamily={"Krona One"}
              className="text-2xl text-BasicBlack"
            >
              ${raised}
            </Typography>
          </Box>
          <Box>
            <Typography
              fontFamily={" Mulish"}
              className="text-lg text-BasicBlack"
            >
              Goal:
            </Typography>
            <Typography
              fontFamily={"Krona One"}
              className="text-2xl text-BasicBlack"
            >
              ${goal}
            </Typography>
          </Box>
        </Box>
      </Box>
   
  );
};

export default SummaryCard;
