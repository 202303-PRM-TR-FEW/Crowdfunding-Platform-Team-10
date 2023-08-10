"use client";

import { useTranslations } from "next-intl";
import Link from "next-intl/link";
useTranslations;

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <div className="justify-center flex bg-[#374259] px-5 md:mx-0">
      <div className=" py-10 md:px-12 container w-screen">
        <div className="text-center md:text-left grid grid-cols-2 md:grid-cols-4 justify-between gap-10 lg:gap-16">
          <div className=" col-span-2">
            <p className="header-3 text-[#d8d8d8] drop-shadow-lg">
              Open<span className="text-[#d8d8d8]">Handed</span>
            </p>
            <p className="text-sm text-[#a5a9aa] py-4 md:py-6">
              {t("text")}
              <Link href="/about">
                <span className="font-bold transition duration-300 ease-in-out hover:text-lightGreen">
                  <br />
                  {t("more")}
                </span>
              </Link>{" "}
            </p>
          </div>
          <div className="col-span-2 grid-cols-3 grid">
            <div className="col-span-1">
              <p className="header-5 text-[#d8d8d8]">{t("team")}</p>
              <ul className="text-sm text-[#a5a9aa] py-4 md:py-6 list-none inline-block">
                <Link href="https://github.com/aysemerveksv" target="_blank">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Ayşe Merve Kosova
                  </li>
                </Link>
                <Link href="https://github.com/BalHasun" target="_blank">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Bal Elsada Hasun
                  </li>
                </Link>
                <Link
                  href="https://github.com/sadikbarisyilmaz"
                  target="_blank"
                >
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Sadik Baris Yilmaz
                  </li>
                </Link>
                <Link href="https://github.com/mhmtnl" target="_blank">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Mehmet Unlu
                  </li>
                </Link>
                <Link href="https://github.com/kainy01" target="_blank">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    Zainab Salah
                  </li>
                </Link>
              </ul>
            </div>
            <div className="col-span-1 lg:ml-5">
              <p className="header-5 text-[#d8d8d8]">{t("link")}</p>
              <ul className="text-sm text-[#a5a9aa] py-4 md:py-6 list-none">
                <Link href="/">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    {t("home")}
                  </li>
                </Link>
                <Link href="/projects">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    {t("projects")}
                  </li>
                </Link>
                <Link href="/about">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out">
                    {t("about")}
                  </li>
                </Link>
              </ul>
            </div>
            <div className="col-span-1">
              <p className="header-5 text-[#d8d8d8]">{t("join")}</p>
              <ul className=" py-4 md:py-6 list-none">
                <li className="">
                  <Link
                    href="/signup"
                    className="py-1 transition hover:text-lightGreen duration-300 ease-in-out text-sm text-[#a5a9aa]"
                  >
                    {t("login")}
                  </Link>
                </li>
                <Link href="/profile">
                  <li className="py-1 transition hover:text-lightGreen duration-300 ease-in-out text-sm text-[#a5a9aa]">
                    {t("prof")}
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
