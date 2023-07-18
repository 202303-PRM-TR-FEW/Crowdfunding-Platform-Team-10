import Comments from "@/components/Comments";
import GetStarted from "@/components/GetStarted";
import LearnMore from "@/components/LearnMore";
import MissionCom from "@/components/MissionCom";
import OurTeam from "@/components/OurTeam";
import React from "react";



const Page = () => {
    return (
        <section className="grid justify-items-center">
            <div className="grid py-12 container">
                <div className="pt-10 flex flex-col text-center lg:text-left">
                    <p className="text-xl md:text-2xl lg:text-3xl text-lightGreen font-bold pb-8 ">Who We Are</p>
                    <p className="header-1">We’re here to support all people and help each other as we can</p>
                    <p className="sub-header pt-10 lg:w-3/5">
                        OpenHanded is a community-powered fundraising platform. We believe that help is powerful, which is why we’re committed to making it safe and easy for anyone to give and get help. Wallet Max is committed to empowering secure and inclusive financial access for everyone, especially the unbanked and the underbanked, and providing quality investment education globally through our proprietary rewards personalization and real-time predictions engine.
                    </p>
                </div>
                <img className="scale-[0.6] mx-auto transition ease-in-out hover:scale-[0.8] hover:rotate-[5deg] duration-700"
                    src="https://firebasestorage.googleapis.com/v0/b/crowdfunding-99b5a.appspot.com/o/hero.png?alt=media&token=f25e81a6-bb2e-4797-b4b0-a03d495988bb"
                    alt=""
                />
            </div>
            <MissionCom />
            <OurTeam />
            <GetStarted />
            <LearnMore />
            <Comments />
        </section>
    );
};

export default Page ;

