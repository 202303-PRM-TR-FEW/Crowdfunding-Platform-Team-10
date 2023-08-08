import React, { useState } from "react";
import { notFound, usePathname, useSearchParams } from "next/navigation";
import faceBook from "../../../public/assets/images/facebookIcon.png";
import twitter from "../../../public/assets/images/twitterIcon.png";
import whatsapp from "../../../public/assets/images/whatsapp.png";
import telegram from "../../../public/assets/images/telegram.png";
import SocialButton from "@/components/helper/SocialButton";
import { ShareRounded } from "@mui/icons-material";

export default function Share() {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const pathname = usePathname();

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

  return (
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
            <ShareRounded
         
              className="ml-[50%]  pr-2 hover:scale-[1.2] text-white -translate-y-1
          transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
      ) : null}

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
  );
}

const SOCIAL = [
  { id: 1, name: "facebook", image: faceBook },
  { id: 5, name: "whatsapp", image: whatsapp },
  { id: 3, name: "twitter", image: twitter },
  { id: 6, name: "telegram", image: telegram },
];
