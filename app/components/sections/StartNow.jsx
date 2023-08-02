"use client";
import Link from "next-intl/link";

function StartNow() {
  return (
    <div>
      <section
        className="container mx-auto flex flex-col text-center p-2 lg:text-left items-center justify-center py-28"
      >
        <h1 className="header-3Green mb-4">Start Now</h1>
        <p className="sub-header lg:w-[700px] mmt-2 mb-5">
          Start Now and Bring Your Ideas to Life! Create a project and raise
          funds for your dream venture, or make a difference by donating to
          projects that align with your passions. Join our community of
          changemakers today!
        </p>
        <div className="space-y-4"></div>
        <div className="md:space-x-4 md:flex-row flex justify-center items-center flex-col">
          <Link href="/signup" className="shadow-lg btn-primary">
            Create New Account
            </Link>
          <Link href="/projects" className="btn-transparent mt-5 md:mt-0">
            Check Projects
          </Link>
        </div>
      </section>
    </div>
  );
}

export default StartNow;
