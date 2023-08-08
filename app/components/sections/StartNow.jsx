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
            <>
              <Link href="/signup" className="shadow-lg btn-primary">
                {t("btn-one")}
              </Link>
              <Link href="/projects" className="btn-transparent mt-5 md:mt-0">
                {t("btn-two")}
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="shadow-lg btn-primary">
                My Projects
              </Link>
              <Link href="/projects" className="btn-transparent mt-5 md:mt-0">
                {t("btn-two")}
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default StartNow;
