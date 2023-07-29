"use client";
import Link from "next-intl/link";

const GetStarted = () => {
  return (
    <div className="bg-lightGreen justify-center flex">
      <section className="grid lg:grid-cols-2 gap-5 py-5 container items-center">
        <div className="p-10 flex flex-col gap-4 text-center lg:text-left">
          <p className="header-2 text-white">
            Now, you may be thinking on join us
          </p>
          <p className="white-subheader">
            We helped over 3,500 projects and causes. Sing in today and get your
            idea kicked off or support others kick off their amazing projects.
          </p>
          <Link href="/projects" className="justify-self-end xl:mt-8">
            <button className="btn-tertiary">Get Started</button>
          </Link>
        </div>
        <div className="flex flex-col justify-items-center">
          <img
            className="scale-75"
            src="https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/hero.png?alt=media&token=f25e81a6-bb2e-4797-b4b0-a03d495988bb"
            alt="writing smtht"
          />
        </div>
      </section>
    </div>
  );
};

export default GetStarted;
