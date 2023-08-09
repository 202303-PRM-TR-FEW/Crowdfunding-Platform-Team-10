"use client";
import Link from "next-intl/link";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";
import Image from "next/image";
const WelcomeBanner = () => {
  const [successfulProjects, setSuccessfulProjects] = useState(24230);
  const [checked, setChecked] = useState(false);
  const t = useTranslations("WelcomeBanner");

  useEffect(() => {
    setChecked(true);
    const totalSuccessfulProjects = "23423";
    let counter = 0;
    const step = Math.ceil(totalSuccessfulProjects / 100);

    const timer = setInterval(() => {
      counter = Math.min(counter + step, totalSuccessfulProjects);
      setSuccessfulProjects(counter);

      if (counter >= totalSuccessfulProjects) {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex justify-center items-center bg-gradient-to-t from-transparent to-teal-50">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 py-28 container">
        <div className="p-10 flex lg:w-[47%] flex-col gap-5 text-center lg:items-start items-center lg:text-left bg-no-repeat bg-right-top bg-[url('../../public/assets/images/dots.svg')]">
          <h1 className="header-1">
            {t("header1")}
            <span className="color-yellow"> {t("header2")} </span>{" "}
            {t("header3")}
          </h1>
          <p className="sub-header">
            {t("subHeader1")}
            <br />
            {t("subHeader2")}
          </p>

          <div className="btn-primary-lg  mt-5">
            <Link href="/projects">{t("button")}</Link>
          </div>
        </div>
        <div
          className="py-10 sm:py-24 relative lg:w-[63%] align-self-and"
          style={{ position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: checked ? "30%" : "-500%",
              left: "20%",
              transform: "translate(-50%, -50%)",
              p: 2,
              background: "#f5d20e7d",
              backdropFilter: "blur(2px)",
              color: "white",
              borderRadius: "10px",
              fontWeight: "bold",
              transition: "top 1.5s ease-in-out",
              textAlign: "center",
              width: "15rem",
              zIndex: 2,
              "@media screen and (max-width: 768px)": {
                top: checked ? "10%" : "-500%",
                left: "50%",
                width: "80%",
              },
            }}
          >
            {t("successful")}
            {successfulProjects}
          </Box>
          <Image
          unoptimized
            src="/assets/images/welcome.png"
            alt="welcome img"
            width={700}
            height={700}
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              borderRadius: "10px",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: checked ? "20%" : "-500%",
              right: "-20%",
              transform: "translate(-50%, -50%)",
              p: 2,
              background: "#00c1a155",
              backdropFilter: "blur(2px)",
              color: "#fff",
              borderRadius: "10px",
              fontWeight: "bold",
              transition: "top 2s ease-in-out",
              textAlign: "center",
              width: "15rem",

              zIndex: 2,
              "@media screen and (max-width: 768px)": {
                top: checked ? "70%" : "-500%",
                right: "0%",
                left: "50%",
                width: "80%",
              },
            }}
          >
            {t("donations")}
            {successfulProjects}
          </Box>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
