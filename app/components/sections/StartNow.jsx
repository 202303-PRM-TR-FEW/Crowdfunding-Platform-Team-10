"use client";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

function StartNow() {
  const { user } = useAuth();
  const t = useTranslations("StartNow");
  return (
    <div>
      <section className="container mx-auto flex flex-col text-center p-2 lg:text-left items-center justify-center py-28">
        <h1 className="header-3Green mb-4"> {t("header")}</h1>
        <p className="sub-header lg:w-[700px] mmt-2 mb-5">{t("paragraph")}</p>
        <div className="space-y-4"></div>
        <div className="md:space-x-4 md:flex-row flex justify-center items-center flex-col">
          {user == null ? (
            <div className="mt-5 flex flex-col lg:flex-row gap-3">
              <div
                className="bg-lightGreen hover:bg-[#f0bd07] text-white
   text-lg rounded-md shadow-lg text-center cursor-pointer transition-all duration-300 ease-in-out py-2 px-14;"
              >
                <Link href="/profile" className="w-full">
                  {t("btn-one")}
                </Link>
              </div>
              <div className="btn-transparent  ">
                <Link href="/projects" className="w-full">
                  {t("btn-two")}
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-5 flex flex-col lg:flex-row gap-5">
              <Link href="/profile">
                <div
                  className="bg-lightGreen hover:bg-[#f0bd07] text-white
   text-lg rounded-md shadow-lg text-center cursor-pointer transition-all duration-300 ease-in-out py-2 px-14;"
                >
                  {t("btn-three")}
                </div>
              </Link>

              <Link href="/projects">
                <div className="btn-transparent-lg">{t("btn-two")}</div>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StartNow;
