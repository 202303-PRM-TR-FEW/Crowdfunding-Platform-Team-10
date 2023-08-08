"use client";
import React from 'react'
import logo from "../../../public/logo.svg";
import Image from "next/image";
import { useTranslations } from 'next-intl';

const About = () => {
    const t = useTranslations("About")
    return (
        <div>
            <section className="grid justify-items-center w-full pb-20 bg-gradient-to-t from-transparent to-teal-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 py-28 container px-5 md:px-0">
                    <div className="pt-10 flex flex-col text-center lg:text-left col-span-1 bg-no-repeat bg-right-top bg-[url('../../public/assets/images/dots.svg')]">
                        <p className="header-3Green pb-10">{t("green-header")}</p>
                        <p className="header-2">{t("header")} <span className="color-yellow">{t("implication")}</span></p>
                        <p className="sub-header pt-10">{t("text")}
                        </p>
                    </div>
                    <Image src={logo} alt="Logo" className='w-[20rem] lg:w-[32rem] pt-20 mx-auto transition ease-in-out hover:scale-[1.2] hover:rotate-[-10deg] duration-700 col-span-1' />
                </div>
            </section>
        </div>
    )
}

export default About