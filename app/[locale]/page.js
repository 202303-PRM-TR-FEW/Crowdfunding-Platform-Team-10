"use client";
import React from "react";
import AboutSection from "@/components/sections/AboutUs";
import Comments from "@/components/commentsCom/Comments";
import WelcomeBanner from "@/components/WelcomeBanner";
import NewsLetterCard from "@/components/cards/NewsLetterCard";
import StartNow from "@/components/sections/StartNow";
import SuccessfulProjects from "@/components/sections/SuccessfulProjects";
import HowWorks from "@/components/sections/HowWorks";


function Page() {
 

  return (
    <div>
      <WelcomeBanner />
      <AboutSection />
      <div className="relative bg-no-repeat overflow-hidden bg-cover">
        <div style={circleBackgroundStyle}></div>
        <HowWorks />
        <StartNow />
        <SuccessfulProjects />
        <div style={circleBackgroundStyle2}></div>
      </div>
      <NewsLetterCard />
      <Comments />
    </div>
  );
}

export default Page;

const circleBackgroundStyle = {
  position: "absolute",
  top: "-50px",
  right: "50px",
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  background: "#00c1a1a5",
  transform: "rotate(45deg)",
  zIndex: -1,
  animation: `moveCircle2 10s linear infinite`,
};
const circleBackgroundStyle2 = {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "500px",
  height: "500px",
  borderRadius: "50%",
  background: "#00c1a144",
  zIndex: -1,
  filter: "blur(20px)",
  animation: `move  10s linear infinite`,
};
