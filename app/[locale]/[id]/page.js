/* eslint-disable @next/next/no-img-element */
"use client";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import LoaderStyle from "@/components/helper/LoaderStyle";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import faceBook from "../../../public/assets/images/facebookIcon.png";
import twitter from "../../../public/assets/images/twitterIcon.png";
import whatsapp from "../../../public/assets/images/whatsapp.png";
import telegram from "../../../public/assets/images/telegram.png";
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
function Project({ params }) {
  const [data, setData] = useState(null);
  const { user, loading, donations } = useAuth();
  const [projectsDonations, setProjectsDonations] = useState([]);
  const [openDonationForm, setOpenDonationForm] = useState(false);
  const pathname = usePathname();
  //this code get single project info and store it into data state
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
        } else {
          console.log("No such document!");
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
  if (loading && user !== null) {
    return <LoaderStyle />;
  }

  if (data === null || !data) {
    // return <LoaderStyle />;
    notFound();
  }

  return (
    <div className=" relative overflow-hidden">
      <section className=" static py-28 p-3 bg-gradient-to-t from-transparent to-teal-50 ">
        <div className="container mx-auto">
          {loading ? (
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

                  <SuccessBadge
                    endingDate={data.left}
                    raised={data.taken}
                    goal={data.goal}
                  />
                </div>
                <Target raised={data.taken} goal={data.goal} />
                <div className=" lg:hidden block w-full">
                  {user ? (
                    data.taken === data.goal ? (
                      <div disabled={true}>
                        The project has been completed 🎉
                      </div>
                    ) : (
                      <button
                        className="btn-primary w-full"
                        onClick={handleDonationForm}
                      >
                        Donate Now
                      </button>
                    )
                  ) : (
                    <a href="/login" className="btn-primary w-full">
                      Log in to fund this project
                    </a>
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
                    data.taken === data.goal || data.taken > data.goal ? (
                      <button disabled={true} className="btn-primary w-full">
                        The project has been completed 🎉
                      </button>
                    ) : (
                      <button
                        className="btn-primary w-full"
                        onClick={handleDonationForm}
                      >
                        Donate Now
                      </button>
                    )
                  ) : (
                    <Link href="/login">
                      <div className="btn-primary w-full">
                        Log in to fund this project
                      </div>
                    </Link>
                  )}
                </div>
              </div>
              <div className="lg:sticky top-20 lg:w-5/12 w-full mt-3  ">
                <DonationsHisory projectsDonations={projectsDonations} />
              </div>
            </div>
          )}
        </div>
        <div className="bg-hoverLightGreen bg-opacity-20 p-1 fixed top-[26%] rounded-r left-0">
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
