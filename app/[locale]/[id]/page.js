/* eslint-disable @next/next/no-img-element */
"use client";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import LoaderStyle from "@/components/helper/LoaderStyle";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import faceBook from "../../../public/assets/images/facebookIcon.png";
import twitter from "../../../public/assets/images/twitterIcon.png";
import whatsapp from "../../../public/assets/images/whatsapp.png";
import telegram from "../../../public/assets/images/telegram.png";
import Image from "next/image";
import { notFound, usePathname, useSearchParams } from "next/navigation";
import SocialButton from "@/components/helper/SocialButton";

import Target from "@/components/helper/Target";
import ViewCount from "@/components/helper/ViewCount";
import UserNameImg from "@/components/helper/UserNameImg";
import CategoryIcon from "@/components/helper/CategoryIcon";
import SuccessBadge from "@/components/SuccessBadge";
import DonationForm from "@/components/forms/DonationForm";
import DonationsHisory from "@/components/cards/DonationsHisory";
import Link from "next/link";
import CommentForm from "@/components/commentsCom/CommentForm";
import CommentRows from "@/components/commentsCom/CommentRows";
function Project({ params }) {
  const [data, setData] = useState([]);
  const [notExists, setNotExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Projects");

  const { user, donations } = useAuth();
  const [projectsDonations, setProjectsDonations] = useState([]);
  const [openDonationForm, setOpenDonationForm] = useState(false);
  const pathname = usePathname();

  const [activeSidebar, setActiveSidebar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "projects", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const projectData = docSnap.data();
          const updatedData = {
            ...projectData,
            viewCount: projectData.viewCount + 1,
          };
          await updateDoc(docRef, updatedData);
          setData(updatedData);
          setLoading(false);
        } else {
          console.log("No such document!");
          setNotExists(true);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
    const donArray = Object.values(donations);

    const projectDon = donArray.filter(
      (donation) => donation.projectId === params.id
    );
    setProjectsDonations(projectDon);
  }, [params.id, donations]);

  const handleDonationForm = () => {
    openDonationForm === false
      ? setOpenDonationForm(true)
      : setOpenDonationForm(false);
  };
  const SOCIAL = [
    { id: 1, name: "facebook", image: faceBook },
    { id: 5, name: "whatsapp", image: whatsapp },
    { id: 3, name: "twitter", image: twitter },
    { id: 6, name: "telegram", image: telegram },
  ];
  const handleShare = (provider) => {
    const BASE_URL = "https://team-10-roan.vercel.app/";
    let projectUrl = `${BASE_URL}${pathname}`;
    const message = `&text=${encodeURIComponent("Help us in this project")}`;
    let url = "";
    if (provider === "facebook") {
      url = `https://www.facebook.com/sharer.php?u=${projectUrl}${message}`;
    } else if (provider === "twitter") {
      url = `https://twitter.com/intent/tweet?url=${projectUrl}${message}`;
    } else if (provider === "instagram") {
      url = `https://www.instagram.com/?url=${projectUrl}${message}`;
    } else if (provider === "pinterest") {
      url = `https://www.pinterest.com/pin/create/button/?url=${projectUrl}${message}`;
    } else if (provider === "whatsapp") {
      url = `https://wa.me/?text=${message} ${projectUrl}`;
    } else {
      url = `https://t.me/share/url?url=${projectUrl}${message}`;
    }
    window.open(url, "_blank", "width=1200,height=600");
  };
  if (notExists) notFound();

  ////To hide donate button if project marked as closed//////////
  const today = new Date();
  const endDate = new Date(data.endingDate);
  ////To hide donate button if project marked as closed//////////

  return (
    <div className=" relative overflow-hidden">
      <section className=" static py-28 p-3 bg-gradient-to-t from-transparent to-teal-50">
        <div className="container mx-auto">
          {loading || data.length <= 0 ? (
            <LoaderStyle />
          ) : (
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              <div className="p-3 flex flex-col gap-4 lg:w-7/12 w-full">
                <div className="">
                  <img src={data.url} alt="" className="w-full rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex  justify-center gap-2 items-center">
                    <h1 className="header-3 text-center my-2 lg:text-start text-lightGreen ">
                      {data.name}
                    </h1>
                    <CategoryIcon category={data.category} />
                  </div>
                  {/* {console.log(today, data.endingDate)} */}
                  <SuccessBadge
                    endingDate={data.endingDate}
                    raised={data.raised}
                    goal={data.goal}
                  />
                </div>
                <Target raised={data.raised} goal={data.goal} />
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
                <p className="color-grey">{data.about}</p>
                <hr className="border-t-2 border-white my-2"></hr>

                <div className="flex items-center justify-between">
                  <UserNameImg
                    userName={data.creator.userName}
                    userImg={data.creator.userImg}
                  />
                  <ViewCount />
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
                <div className=" hidden lg:block  py-3  ">
                  <CommentRows id={params.id} />
                  <CommentForm params={params} />
                </div>
              </div>
              <div className="lg:sticky top-20 lg:w-5/12 w-full mt-3  ">
                <DonationsHisory projectsDonations={projectsDonations} />
              </div>
            </div>
          )}
        </div>
        <div
          className={`${
            activeSidebar ? "" : "-translate-x-[120%]"
          } bg-hoverLightGreen bg-opacity-20 p-1 fixed top-[26%] rounded-r left-0 transition-all duration-300 ease-in-out`}
        >
          {!activeSidebar ? (
            <div
              onClick={() => {
                setTimeout(() => {
                  setActiveSidebar((prev) => !prev);
                }, 3000);
                setActiveSidebar((prev) => !prev);
              }}
              className="absolute h-full w-10/12 z-10 py-2 cursor-pointer"
            >
              <div className="relative bg-hoverLightGreen pt-3 pb-1 rounded-r top-1/2 -translate-y-1/2 left-[108%]">
                <svg
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  className="ml-[50%] pr-2 hover:scale-[1.2] -translate-y-1 transition-all duration-300 ease-in-out"
                >
                  <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
                </svg>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="share-icon flex flex-col items-center justify-center">
            {SOCIAL.map((item) => {
              return (
                <div key={item.id}>
                  <SocialButton
                    width={50}
                    height={50}
                    src={item.image}
                    alt={item.name}
                    provider={item.name}
                    handleShare={handleShare}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <DonationForm
          id={params}
          title={data.name}
          openDonationForm={openDonationForm}
          setOpenDonationForm={setOpenDonationForm}
        />
        <div className=" block lg:hidden  py-3  ">
          <CommentRows id={params.id} />
          <CommentForm params={params} />
        </div>
      </section>

      <div style={circleBackgroundStyle}></div>
    </div>
  );
}

export default Project;

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
