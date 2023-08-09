"use client";

import Comments from "@/components/commentsCom/Comments";
import GetStarted from "./GetStarted";
import MissionCom from "./MissionCom";
import OurTeam from "./OurTeam";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AboutUs = () => {
  const t = useTranslations("About");
  return (
    <div>
      <section className=" bg-gradient-to-t from-transparent to-teal-50">
        <div
          className="grid lg:grid-cols-2 grid-cols-1 gap-5 items-center justify-between lg:h-[100vh] py-28 container 
         overflow-hidden"
        >
          <div
            className="flex flex-col text-center  lg:text-left  bg-no-repeat bg-right-top
           bg-[url('../../public/assets/images/dots.svg')]"
          >
            <p className="header-3Green pb-10">{t("green-header")}</p>
            <p className="header-2">
              {t("header")}{" "}
              <span className="color-yellow">{t("implication")}</span>
            </p>
            <p className="sub-header pt-10">{t("text")}</p>
          </div>
          <div className="flex items-center w-full justify-self-end">
            <Image
              unoptimized
              src="/assets/images/logo.svg"
              width={600}
              height={600}
              alt="Logo"
              loading="lazy"
              className="w-full lg:w-full md:w-[50%] mx-auto transition ease-in-out hover:scale-[1.2] hover:rotate-[-10deg] duration-700 col-span-1 overflow-hidden"
            />
          </div>
        </div>
      </section>
      <MissionCom />
      <OurTeam />
      <GetStarted />
      <Comments />
    </div>
  );
};

export default AboutUs;
