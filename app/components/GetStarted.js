import Link from "next/link";
import React from "react";

const GetStarted = () => {
  return (
    <section className="bg-lightGreen bg-cover justify-center flex">
      <div className="grid lg:grid-cols-2 gap-5 py-5 container items-center">
        <div className="p-10 flex flex-col gap-4 text-center lg:text-left">
          <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">Now, you may be thinking on join us</p>
          <p className="text-base md:text-lg lg:text-xl text-white ">
            We helped over 3.500 projects and causes. Sing in today and get your
            idea kicked off or support others kick off their amazing projects.
          </p>
          <Link href="/projects" className="justify-self-end xl:mt-8">
            <button className=" bg-white hover:bg-gray-100 text-black font-bold text-xl py-2 px-4  rounded text-center cursor-pointer transition-all duration-300 ease-in-out">Get Started</button>
          </Link>
        </div>
        <div className="flex flex-col justify-items-center">
          <img className="scale-75"
            src="https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/hero.png?alt=media&token=f25e81a6-bb2e-4797-b4b0-a03d495988bb"
            alt="writing smtht"
          />
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
