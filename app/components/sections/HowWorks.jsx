"use client";
import React from "react";
import { useTranslations } from "next-intl";

const HowWorks = () => {
  const t = useTranslations("HowWorks");
  return (
    <section className="bg-gradient-to-t from-transparent to-teal-50 ">
      <div
        className="container mx-auto flex flex-col text-center p-2  md:text-left items-center justify-center pt-28 pb-20 
        bg-[length:200px_200px] bg-[right_top_2rem] bg-no-repeat [url('../../public/assets/images/dots.svg')]
      "
      >
        <p className="header-3">
          {t("header1")}
          <span className="color-green">
            {t("header2")}
            <span className="text-[#1f9e92]"> {t("header3")}</span>
          </span>{" "}
          {t("header4")}
        </p>
        <p className="text-sm color-grey py-2 text-center">{t("sub-header")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-16 gap-10 md:mt-20 mt-10 mx-5 md:mx-0">
          <div className="group gr col-span-1 w-full grid grid-cols-1 items-center ">
            <div className="col-span-1 flex md:flex-row flex-col justify-between items-center">
              <div className="lg:w-14 lg:h-14 w-8 h-8 rounded-full bg-[#f0bd07] flex justify-center items-center mb-5 group-hover:bg-[#00c1a2] group-hover:scale-[1.3] transition duration-700 ease-in-out">
                <p className="header-3 text-white">1</p>
              </div>
              <div className="hidden lg:inline-block border-dotted border-t-8 border-[#f0bd07] lg:w-48 xl:w-60 2xl:w-72 mb-5 group-hover:border-[#00c1a2] transition duration-700 ease-in-out"></div>
            </div>
            <div className="col-span-1">
              <p className="header-4">{t("sub-header-one")} </p>
              <ul className="mt-3 ml-10 md:ml-5 text-left">
                <li className="sub-header flex items-start space-x-3">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-[#00c1a2] mt-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span> {t("paragraph-one")}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="group col-span-1 w-full grid grid-cols-1">
            <div className="col-span-1 flex md:flex-row flex-col justify-between items-center">
              <div className="lg:w-14 lg:h-14 w-8 h-8 rounded-full bg-[#f0bd07] flex justify-center items-center mb-5 group-hover:bg-[#00c1a2] group-hover:scale-[1.3] transition duration-700 ease-in-out">
                <p className="header-3 text-white">2</p>
              </div>
              <div className="hidden lg:inline-block border-dotted border-t-8 border-[#f0bd07] lg:w-48 xl:w-60 2xl:w-72 mb-5 group-hover:border-[#00c1a2] transition duration-700 ease-in-out"></div>
            </div>
            <div className="col-span-1">
              <p className="header-4">{t("sub-header-two")} </p>
              <ul className="mt-3 ml-10 md:ml-5 text-left">
                <li className="sub-header flex items-start space-x-3">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-[#00c1a2] mt-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span>{t("paragraph-two")}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="group col-span-1 w-full grid grid-cols-1">
            <div className="col-span-1 flex md:flex-row flex-col justify-start items-center">
              <div className="lg:w-14 lg:h-14 w-8 h-8 rounded-full bg-[#f0bd07] flex justify-center items-center mb-5 group-hover:bg-[#00c1a2] group-hover:scale-[1.3] transition duration-700 ease-in-out">
                <p className="header-3 text-white">3</p>
              </div>
              <svg
                className=" flex-shrink-0 w-3.5 h-3.5 text-[#f0bd07] -mt-5 scale-[4] ml-14 group-hover:scale-[6] group-hover:translate-x-6 group-hover:text-[#00c1a2] transition duration-700 ease-in-out"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  className="invisible lg:visible"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </div>
            <div className="col-span-1">
              <p className="header-4">{t("sub-header-three")}</p>
              <ul className="mt-3 ml-10 md:ml-5 text-left">
                <li className="sub-header flex items-start space-x-3">
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-[#00c1a2] mt-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span> {t("paragraph-three")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
