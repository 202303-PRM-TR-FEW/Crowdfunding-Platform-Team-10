"use client";

import { useTranslations } from "next-intl";

const MissionCom = () => {
  const t = useTranslations("Mission")
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
  };
  const circleBackgroundStyle2 = {
    position: "absolute",
    bottom: "10px",
    left: "50px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "#00c1a1a5",
    transform: "rotate(45deg)",
    zIndex: -1,
    filter: "blur(20px)",
    animation: `moveCircle 10s linear infinite`,
  };
    
  return (
    <div
      className="justify-center  flex relative overflow-hidden bg-gray-100"
      style={{ backdropFilter: "blur(14px)" }}
    >
      <div style={circleBackgroundStyle}></div>
      <section className="text-center py-28  container mx-auto">
        <p className="header-3Green pb-10 text-center ">{t("green-header")}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-10 md:gap-20 ">
          <div className="text-center lg:text-right col-span-1">
            <p className="header-3">{t("header-left")}{" "}
            </p>
            <p className="sub-header py-10">{t("text-left")}
            </p>
          </div>
          <div className=" text-center lg:text-left col-span-1">
            <p className="header-3">
              {t("header-right")}{" "}
            </p>
            <p className="sub-header py-10">{t("text-right")}
            </p>
          </div>
        </div>
      </section>
      <div style={circleBackgroundStyle2}></div>
    </div>
  );
};

export default MissionCom;
