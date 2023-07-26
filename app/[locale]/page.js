import AboutSection from "@/components/sections/AboutUs";
import WelcomeBanner from "@/components/WelcomeBanner";
import NewsLetterCard from "@/components/cards/NewsLetterCard";
import React from "react";
import BestProjects from "@/components/sections/BestProjects";
import StartNow from "@/components/sections/StartNow";
function page() {
  return (
    <div>
      <WelcomeBanner />
      <AboutSection />
      <StartNow />
      <BestProjects />
      <NewsLetterCard />
    </div>
  );
}

export default page;
