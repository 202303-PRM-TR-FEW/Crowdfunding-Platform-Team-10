import AboutSection from "@/components/AboutUs";
import WelcomeBanner from "@/components/WelcomeBanner";
import NewsLetterCard from "@/components/cards/NewsLetterCard";
import React from "react";
function page() {
  return (
    <div>
      <WelcomeBanner />
      <AboutSection />
      <NewsLetterCard />
    </div>
  );
}

export default page;
