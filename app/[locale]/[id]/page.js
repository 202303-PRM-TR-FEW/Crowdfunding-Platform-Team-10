/* eslint-disable @next/next/no-img-element */
"use client";

import { ProjectInfo } from "@/components/ProjectInfo";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import faceBook from "../../../public/assets/images/facebookIcon.png";
import twitter from "../../../public/assets/images/twitterIcon.png";
import pinterest from "../../../public/assets/images/pinterestIcon.png";
import instagram from "../../../public/assets/images/instagramIcon.png";
import whatsapp from "../../../public/assets/images/whatsapp.png";
import telegram from "../../../public/assets/images/telegram.png";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import SocialButton from "@/components/helper/SocialButton";
function Project({ params }) {
  const pathname = usePathname();
  const [data, setData] = useState(null);
  const { formatNumber } = useAuth();

  //this code pass data to single project page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "projects", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Increment the viewCount field when fetching the project
          const projectData = docSnap.data();
          const updatedData = {
            ...projectData,
            viewCount: projectData.viewCount + 1,
          };
          await updateDoc(docRef, updatedData);

          setData(updatedData); // Set the state with the updated data
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const formattedViewCount = formatNumber(data?.viewCount || 0);
  const formattedGoal = formatNumber(data?.goal || 0);
  const formattedRise = formatNumber(data?.raised || 0);

  const SOCIAL = [
    { id: 1, name: "facebook", image: faceBook },
    { id: 5, name: "whatsapp", image: whatsapp },
    // { id: 2, name: "instagram", image: instagram },
    { id: 3, name: "twitter", image: twitter },
    // { id: 4, name: "pinterest", image: pinterest },
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
  if (data === null || !data) {
    return <LoaderStyle />;
  }

  return (
    <>
      <ProjectInfo
        title={data.name}
        userName={data.creator.userName}
        userImg={data.creator.userImg}
        userId={data.creator.userId}
        about={data.about}
        taken={data.raised}
        goal={data.goal}
        formattedRise={formattedRise}
        formattedGoal={formattedGoal}
        left={data.endingDate}
        img={data.url}
        id={params}
        viewCount={formattedViewCount}
      />
      <div className="bg-hoverLightGreen bg-opacity-60 p-1 fixed top-[26%] rounded-r left-0">
        <div className="share-icon flex flex-col items-center justify-center">
          {SOCIAL.map((item) => {
            return (
              <div key={item.id}>
                <SocialButton
                  width={70}
                  height={70}
                  src={item.image}
                  alt={item.name}
                  provider={item.name}
                  handleShare={handleShare}
                />
              </div>
            );
          })}
          <hr className="bg-[#BBBBBB] mb-2 h-[2px] w-full" />
          <h5 className="">Share</h5>
        </div>
      </div>
    </>
  );
}

export default Project;
