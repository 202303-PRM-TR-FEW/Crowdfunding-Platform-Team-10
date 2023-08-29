"use client";
import { GitHub } from "@mui/icons-material";
import Image from "next/image";
import { IconButton } from "@mui/material";
import { useTranslations } from "next-intl";
const OurTeam = () => {
  const t = useTranslations("Team");

  return (
    <div className=" flex flex-col text-center lg:text-left container mx-auto">
      <p className="header-3Green my-10 text-center">{t("green-header")}</p>
      <div className="flex flex-row flex-wrap gap-8 justify-center py-10">
        <div className="group/item h-60 w-60 lg:h-[300px] lg:w-[300px] rounded transition ease-in-out hover:bg-gradient-to-t hover:from-black shadow-lg ">
          <div>
            <Image
              src="/assets/images/ays.jpeg"
              unoptimized
              width={200}
              height={200}
              className="w-full -z-10 relative"
              alt="Avatar"
            />
          </div>
          <a
            href="https://github.com/aysemerveksv"
            target="_blank"
            className="cursor-pointer"
          >
            <div className=" group/edit group-hover/item:visible relative invisible -top-16 lg:-top-20 text-center font-bold color-yellow text-base">
              <p>{t("work")}</p>
              <h1 className=" text-white md:text-lg lg:text-xl">
                Ayşe Merve Kosova
                <span className="pl-3">
                  <IconButton>
                    <GitHub sx={{ color: "white" }} />
                  </IconButton>
                </span>
              </h1>
            </div>
          </a>
        </div>
        <div className="group/item h-60 w-60 lg:h-[300px] lg:w-[300px] rounded transition ease-in-out hover:bg-gradient-to-t hover:from-black shadow-lg ">
          <div>
            <Image
              src="/assets/images/bal.jpeg"
              unoptimized
              width={200}
              height={200}
              className="w-full -z-10 relative"
              alt="Avatar"
            />
          </div>
          <a
            href="https://github.com/BalHasun"
            target="_blank"
            className="cursor-pointer"
          >
            <div className=" group/edit group-hover/item:visible relative invisible -top-16 lg:-top-20 text-center font-bold color-yellow text-base">
              <p>{t("work")}</p>
              <h1 className=" text-white md:text-lg lg:text-xl">
                Bal Elsada Hasun
                <span className="pl-3">
                  <IconButton>
                    <GitHub sx={{ color: "white" }} />
                  </IconButton>
                </span>{" "}
              </h1>
            </div>
          </a>
        </div>
        <div className="group/item h-60 w-60 lg:h-[300px] lg:w-[300px] rounded transition ease-in-out hover:bg-gradient-to-t hover:from-black shadow-lg ">
          <div>
            <Image
              src="/assets/images/bar.jpeg"
              unoptimized
              width={200}
              height={200}
              className="w-full -z-10 relative"
              alt="Avatar"
            />
          </div>
          <a
            href="https://github.com/sadikbarisyilmaz"
            target="_blank"
            className="cursor-pointer"
          >
            <div className=" group/edit group-hover/item:visible relative invisible -top-16 lg:-top-20 text-center font-bold color-yellow text-base">
              <p>{t("work")}</p>
              <h1 className=" text-white md:text-lg lg:text-xl">
                Sadik Baris Yilmaz
                <span className="pl-3">
                  <IconButton>
                    <GitHub sx={{ color: "white" }} />
                  </IconButton>
                </span>{" "}
              </h1>
            </div>
          </a>
        </div>
        <div className="group/item h-60 w-60 lg:h-[300px] lg:w-[300px] rounded transition ease-in-out hover:bg-gradient-to-t hover:from-black shadow-lg ">
          <div>
            <Image
              src="/assets/images/meh.jpeg"
              unoptimized
              width={200}
              height={200}
              className="w-full -z-10 relative"
              alt="Avatar"
            />
          </div>
          <a
            href="https://github.com/mhmtnl"
            target="_blank"
            className="cursor-pointer"
          >
            <div className=" group/edit group-hover/item:visible relative invisible -top-16 lg:-top-20 text-center font-bold color-yellow text-base">
              <p>{t("work")}</p>
              <h1 className=" text-white md:text-lg lg:text-xl">
                Mehmet Unlu
                <span className="pl-3">
                  <IconButton>
                    <GitHub sx={{ color: "white" }} />
                  </IconButton>
                </span>{" "}
              </h1>
            </div>
          </a>
        </div>
        <div className="group/item h-60 w-60 lg:h-[300px] lg:w-[300px] rounded transition ease-in-out hover:bg-gradient-to-t hover:from-black shadow-lg ">
          <div>
            <Image
              src="/assets/images/kai.jpeg"
              unoptimized
              width={200}
              height={200}
              className="w-full -z-10 relative"
              alt="Avatar"
            />
          </div>
          <a
            href="https://github.com/zainab-salah"
            target="_blank"
            className="cursor-pointer"
          >
            <div className=" group/edit group-hover/item:visible relative invisible -top-16 lg:-top-20 text-center font-bold color-yellow text-base">
              <p>{t("work")}</p>
              <h1 className=" text-white md:text-lg lg:text-xl">
                Zainab Salah
                <span className="pl-3">
                  <IconButton>
                    <GitHub sx={{ color: "white" }} />
                  </IconButton>
                </span>{" "}
              </h1>
            </div>
          </a>
        </div>
      </div>
      <p className="pt-5 pb-10 italic font-bold text-center text-base md:text-lg lg:text-xl text-basicgray">
        {t("message")}
      </p>
    </div>
  );
};

export default OurTeam;
