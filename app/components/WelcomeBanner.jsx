import Link from "next/link";
import React from "react";
import dots from "../../public/assets/images/dots.svg";
const WelcomeBanner = () => {
  return (
    <section className="flex justify-center items-center bg-gradient-to-t from-transparent to-teal-50">
      <div className="grid lg:grid-cols-2 gap-8 py-28 container">
        <div className="p-10 flex flex-col gap-4 text-center lg:text-left bg-no-repeat bg-right-top bg-[url('../../public/assets/images/dots.svg')]" 
      
        >
          <p className="header-1">Supporting great causes made easy</p>
          <p className="sub-header">
            We helped over 3.500 projects and causes. Sing in today and get your
            idea kicked off or support others kick off their amazing projects.
          </p>
          <Link href="/projects" className="justify-self-end xl:mt-8">
            <button className="btn-primary">Start Today</button>
          </Link>
        </div>
        <div className="p-10 sm:p-24">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/hero.png?alt=media&token=f25e81a6-bb2e-4797-b4b0-a03d495988bb"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
