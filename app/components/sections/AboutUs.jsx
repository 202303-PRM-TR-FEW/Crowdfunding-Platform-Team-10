"use client";
import Link from "next-intl/link";
import AboutUs from "../../../public/assets/images/About_us.png";
import Image from "next/image";

const AboutSection = () => {
  return (
    <div className="container mx-auto flex  items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-5  items-center justify-center  lg:py-28 lg:pb-28 py-20 px-2">
        <div className="scale-[0.9]">
          <Image src={AboutUs} alt="AboutUs" className="w-full" />
        </div>

        <div className="">
          <span className="text-xs color-green bg-yellow-light px-5 py-1 pt-2 rounded">
            ABOUT US
          </span>

          <h2 className="header-2 mt-10 mb-5">
            Our Highest Ambition <br /> is to
            <span className="color-yellow mx-2">Help People</span>
          </h2>

          <p className="mb-0 sub-header">
            Get instant helpful resources about anything on the go, easily
            implement secure money transfer solutions, boost your daily
            efficiency, connect to other app users and create your own Fronter
            network, and much more with just a few taps. commodo consequat. Duis
            aute irure.
          </p>

          <div className="mt-5">
            <Link href="/about" className="btn-primary">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
