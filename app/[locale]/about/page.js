import Comments from '@/components/Comments'
import GetStarted from '@/components/GetStarted'
import MissionCom from './MissionCom'
import OurTeam from './OurTeam'
import React from 'react'
import LearnMore from './LearnMore'
import logo from "../../../public/logo.svg";
import Image from "next/image";


const AboutUs = () => {
  return (
    <div>
      <section className="grid justify-items-center w-full pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 py-12 container px-5 md:px-0">
          <div className="pt-10 flex flex-col text-center lg:text-left col-span-1">
            <p className="header-3Green pt-10">Who We Are</p>
            <p className="header-2">We are here to support all people and help each other as we can</p>
            <p className="sub-header pt-10">
              OpenHanded is a community-powered fundraising platform. We believe that help is powerful, which is why we are committed to making it safe and easy for anyone to give and get help. Wallet Max is committed to empowering secure and inclusive financial access for everyone, especially the unbanked and the underbanked, and providing quality investment education globally through our proprietary rewards personalization and real-time predictions engine.
            </p>
          </div>
          {/* pt-20 animate-bounce */}
          <Image src={logo} alt="Logo" className='w-[20rem] lg:w-[32rem] pt-20 mx-auto transition ease-in-out hover:scale-[1.2] hover:rotate-[-10deg] duration-700 col-span-1' />
        </div>
      </section>
      <MissionCom />
      <OurTeam />
      <LearnMore />
      <GetStarted />
      <Comments />
    </div>
  )
}

export default AboutUs