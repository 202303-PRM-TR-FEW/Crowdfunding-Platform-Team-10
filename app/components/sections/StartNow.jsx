import React from "react";
import Link from "next-intl/link";

function StartNow() {
  return (
    <div className="bg-gradient-to-t from-transparent to-teal-50">
      <section
        className="container mx-auto flex flex-col text-center p-2 lg:text-left items-center justify-center py-28 
        bg-[length:200px_200px] bg-[right_top_2rem] bg-no-repeat bg-[url('https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/dots.svg?alt=media&token=7a903a0a-56f7-4321-8497-13b2325a2477')]
      "
      >
        <h1 className="header-3 font-bold color-green mb-4">Start Now</h1>
        <p className="color-grey lg:w-[700px] my-2">
          Start Now and Bring Your Ideas to Life! Create a project and raise
          funds for your dream venture, or make a difference by donating to
          projects that align with your passions. Join our community of
          changemakers today!
        </p>
        <div className="space-y-4"></div>
        <div className="flex mt-4 space-x-4">
          <Link href="/signup" className=" shadow-lg font-medium btn-primary">
            Create New Account
          </Link>
          <Link href="/projects" className="  color-green btn-transpernt">
            Check Projects
          </Link>
        </div>
      </section>
    </div>
  );
}

export default StartNow;
