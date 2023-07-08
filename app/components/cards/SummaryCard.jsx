import React from "react";
import img1 from "../../../public/assets/images/img1.png";
import img2 from "../../../public/assets/images/img2.png";
import img3 from "../../../public/assets/images/img3.png";
import { Box, LinearProgress, Typography } from "@mui/material";
import Image from "next/image";
import CustomizedProgressBars from "../helper/ProgressBar";
const cards = [
  {
    cat: "education",
    goal: 11000,
    image: img1,
    raised: 2500,
    title: "School reconstruction",
    transactions: {
      user: {
        amount: 200,
        date: "June 20, 2023 at ,9:,39:56 PM UTC+3",
        name: "user1",
      },
    },
  },
  {
    cat: "culture",
    goal: 2300,
    image: img2,
    raised: 1600,
    title: "Intelligent weather app development",
    transactions: {
      user: {
        amount: 200,
        date: "June 20, 2023 at ,9:,39:56 PM UTC+3",
        name: "user1",
      },
    },
  },
  {
    cat: "animals",
    goal: 3500,
    image: img3,
    raised: 2500,
    title: "Build a cat shelter with us! ",
    transactions: {
      user: {
        amount: 200,
        date: "June 20, 2023 at ,9:,39:56 PM UTC+3",
        name: "user1",
      },
    },
  },
  {
    cat: "culture",
    goal: 11000,
    image: img1,
    raised: 2500,
    title: "School reconstruction",
    transactions: {
      user: {
        amount: 200,
        date: "June 20, 2023 at ,9:,39:56 PM UTC+3",
        name: "user1",
      },
    },
  },
  {
    cat: "animals",
    goal: 11000,
    image: img3,
    raised: 2500,
    title: "Build a cat shelter with us! ",
    transactions: {
      user: {
        amount: 200,
        date: "June 20, 2023 at ,9:,39:56 PM UTC+3",
        name: "user1",
      },
    },
  },
];
const SummaryCard = ({img,title,raised,goal}) => {
  return (

    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-10">
      {cards.slice(0, 3).map((card, i) => {
        return (
          <Box key={i} className="flex flex-col self-stretch gap-3 w-[295px]">
            <img
              width={295}
              height={165}
              src={img}
              alt="asdf"
              objectFit="cover"
            />
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
      })}
    </Box>
  );
};

export default SummaryCard;
