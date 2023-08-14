"use client";
import React from "react";
import NotFoundImage from "../../../public/assets/images/notFound.png";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const NotFoundComponent = () => {
  const t = useTranslations("Helper");
  return (
    <div className=" bg-gradient-to-t from-transparent to-teal-50 relative overflow-hidden">
      <div className="py-16 h-screen flex flex-col gap-12 items-center justify-center">
        <div className="text-center">
          <h2 className="header-4 py-8 ">{t("sorry")}</h2>
          <Link href="/">
            <button className="btn-primary">{t("button")}</button>
          </Link>
        </div>
        <div className="">
          <Image
            // className="w-full h-full lg:w[500px]"
            src={NotFoundImage}
            width={640}
            height={360}
            alt="404"
          />
        </div>
      </div>
      <div style={circleBackgroundStyle}></div>
    </div>
  );
};

export default NotFoundComponent;
const circleBackgroundStyle = {
  position: "absolute",
  top: "-50px",
  right: "50px",
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  background: "#00c1a1a5",
  transform: "rotate(45deg)",
  zIndex: -1,
  animation: `moveCircle2 10s linear infinite`,
  overFlow: "hidden",
};
