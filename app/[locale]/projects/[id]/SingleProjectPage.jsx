"use client";
import SuccessBadge from "@/components/SuccessBadge";
import CommentForm from "@/components/commentsCom/CommentForm";
import CommentRows from "@/components/commentsCom/CommentRows";
import CategoryIcon from "@/components/helper/CategoryIcon";
import Target from "@/components/helper/Target";
import UserNameImg from "@/components/helper/UserNameImg";
import ViewCount from "@/components/helper/ViewCount";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next-intl/link";
import React from "react";

export default function SingleProjectPage({
  data,
  user,
  handleDonationForm,
  handleDeleteProject,
  params,
}) {
  const t = useTranslations("Projects");

  const today = new Date();
  const endDate = new Date(data.endingDate);
  return (
    <div className="px-3 flex flex-col items-center gap-4 lg:w-7/12 w-full overflow-hidden  rounded-lg">
      <div className="overflow-hidden rounded-lg relative w-[326px] h-[222px] sm:w-[660px] sm:h-[390px] md:h-[554px] lg:h-[366px] xl:h-[554px] md:w-full">
        <Image
          src={data.url}
          alt="project img"
          fill={true}
          style={{
            objectFit: "cover",
            borderRadius: "12px",
            overflow: "hidden",
          }}
          sizes="(max-width: 768px) 100vw"
        />
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="flex  justify-center gap-2 items-center">
          <h1 className="header-3 text-center my-2 lg:text-start text-lightGreen ">
            {data.name}
          </h1>
          <div className="mt-3">
            <CategoryIcon category={data.category} />
          </div>
        </div>

        <SuccessBadge
          endingDate={data.endingDate}
          raised={data.raised}
          goal={data.goal}
        />
      </div>
      <div className="w-full">
        <Target raised={data.raised} goal={data.goal} />
      </div>
      <div className=" lg:hidden block w-full">
        {user ? (
          today < endDate ? (
            data.raised === data.goal || data.raised > data.goal ? (
              <button disabled={true} className="btn-primary w-full">
                {t("projects-completed")}
              </button>
            ) : (
              <button
                className="btn-primary w-full"
                onClick={handleDonationForm}
              >
                {t("donate-btn")}
              </button>
            )
          ) : (
            <div></div>
          )
        ) : today < endDate ? (
          <Link href="/login">
            <div className="btn-primary w-full">{t("login-btn")}</div>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      <div className="w-full">
        <p className="color-grey">{data.about}</p>
        <hr className="border-t-2 border-white my-2"></hr>

        <div className="flex items-center justify-between">
          <UserNameImg
            userId={data.creator.userId}
            userName={data.creator.userName}
            userImg={data.creator.userImg}
          />
          <ViewCount viewCount={data.viewCount} />
        </div>
      </div>

      <div className=" lg:block hidden my-2 w-full">
        {user ? (
          today < endDate ? (
            data.raised === data.goal || data.raised > data.goal ? (
              <button disabled={true} className="btn-primary w-full">
                {t("projects-completed")}
              </button>
            ) : (
              <button
                className="btn-primary w-full"
                onClick={handleDonationForm}
              >
                {t("donate-btn")}
              </button>
            )
          ) : (
            <div></div>
          )
        ) : today < endDate ? (
          <Link href="/login">
            <div className="btn-primary w-full">{t("login-btn")}</div>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      {user?.uid == data.creator.userId ? (
        <button className="btn-red  w-full my-2" onClick={handleDeleteProject}>
          Delete Project
        </button>
      ) : null}
      <div className=" hidden lg:block w-full py-3">
        <CommentRows id={params.id} />
        {user ? <CommentForm params={params} /> : null}
      </div>
    </div>
  );
}
