import Comments from "@/components/Comments";
import WelcomeBanner from "@/components/WelcomeBanner";
import NewsLetterCard from "@/components/cards/NewsLetterCard";

import React from "react";
function page() {
  return (
    <div>
      <WelcomeBanner />
      <NewsLetterCard />
      <Comments />
    </div>
  );
}

export default page;
