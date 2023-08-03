"use client";
import Image from "next/image";
import Link from "next-intl/link";
import React from "react";
import Heart from "../../../public/assets/images/Hearth.png";
import Hands from "../../../public/assets/images/Hands.png";

const Thank = () => {

  return (
    <div>
      <section className="grid justify-items-center w-full pb-20 bg-gradient-to-t from-transparent to-teal-50 overflow-y-hidden">
        <div className="group justify-items-center grid grid-cols-1 py-28 container px-5 md:px-0 bg-[length:200px_200px] bg-[right_top_2rem] bg-no-repeat bg-[url('https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/dots.svg?alt=media&token=7a903a0a-56f7-4321-8497-13b2325a2477')]">
          <div className="md:group-hover:translate-y-20 scale-[0.5] min-h-62 md:scale-[1] pt-5 md:pt-20 justify-items-center box-border col-span-1 relative transition ease-in-out group-hover:scale-[0.6] md:group-hover:scale-[1.2] group-hover:rotate-[180deg] duration-700 max-h-72">
            <Image className="relative w-auto h-auto scale-[0.5] top-16 group-hover:animate-[hearth_1s_ease-in-out_infinite] "
              src={Heart}
              alt="Hearth"
            />
            <Image className=" w-auto h-auto scale-[1.7] absolute left-0 top-0 pt-10 md:pt-20 group-hover:opacity-5 transition duration-700"
              src={Hands}
              alt="Hands"
            />
          </div>
          <div className="pt-10 md:pt-20 flex flex-col text-center justify-items-center col-span-1 w-4/5 group/edit ">
            <p className="header-1 text-center">Thank you <span className="color-green">Open<span className="text-[#1f9e92]">Handed</span></span></p>
            <p className="sub-header pt-10 mx-auto justify-center text-justify">
              You have successfully made an amazing donation. Thanks for joining OpenHanded community. While you wait for new attempts from other people, check out the <Link href="/projects" className="color-yellow font-extrabold cursor-pointer"> latest projects!</Link>
            </p>
            <Link href="/">
              <button className="btn-primary mt-10">Go to home page</button>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
export default Thank;
