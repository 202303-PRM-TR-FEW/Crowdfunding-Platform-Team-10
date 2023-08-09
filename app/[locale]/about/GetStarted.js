"use client";
import Link from "next-intl/link";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const GetStarted = () => {
  const t = useTranslations("GetStarted");

  return (
    <div className="bg-lightGreen justify-center flex">
      <section className="grid lg:grid-cols-2 gap-5 mx-auto container py-28 items-center">
        <div className="px-10 flex flex-col gap-4 text-center lg:text-left">
          <p className="header-2 text-white">{t("header")}</p>
          <p className="white-subheader">{t("text")}</p>
          <Link href="/projects" className="justify-self-end xl:mt-8">
            <button className="btn-tertiary">{t("button")}</button>
          </Link>
        </div>
        <div className="flex flex-col justify-items-center">
          <Image
            className="scale-75"
            src="/assets/images/getstart.png"
            alt="get started img"
            width={500}
            height={500}
            unoptimized
          />
        </div>
      </section>
    </div>
  );
};

export default GetStarted;
