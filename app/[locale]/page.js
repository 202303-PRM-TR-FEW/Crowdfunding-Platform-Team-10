import AboutSection from "@/components/sections/AboutUs";
// import Comments from "@/components/Comments";
import WelcomeBanner from "@/components/WelcomeBanner";
import NewsLetterCard from "@/components/cards/NewsLetterCard";
import React from "react";

import StartNow from "@/components/sections/StartNow";
import PaymentForm from "@/components/forms/PaymentForm";
function page() {
  return (
    <div>
      <WelcomeBanner />
      <AboutSection />
      <StartNow />
      {/* <Comments /> */}
      <NewsLetterCard />
      {/* <Comments /> */}
      <PaymentForm />
    </div>
  );
}

export default page;
