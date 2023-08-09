"use client";
import Link from "next-intl/link";
import AboutUs from "../../../public/assets/images/About_us.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AboutSection = () => {
  const t = useTranslations("AboutUs");
  return (
    <div className="container mx-auto flex  items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-5  items-center justify-center  lg:py-10 lg:pb-28 py-10 px-2">
        <div className="scale-[0.9]">
          <Image src={AboutUs} alt="AboutUs" unoptimized width={500} height={500} className="w-full" />
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <span className="text-xs color-green bg-yellow-light px-5 py-1 pt-1 rounded">
            {t("header")}
          </span>

          <h2 className="header-2 mt-10 mb-5">
            {t("white-part-header")} <br />
            {t("white-part-two-header")}
            <span className="color-yellow mx-2">{t("yellow-part-header")}</span>
          </h2>

          <p className="mb-0 sub-header">{t("paragraph")}</p>

          <div className="mt-7 btn-primary-lg">
            <Link href="/about">{t("more-link")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
