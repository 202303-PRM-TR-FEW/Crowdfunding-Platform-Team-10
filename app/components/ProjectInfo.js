import React, { useEffect, useState } from "react";
import user_img from "../../public/assets/images/user_img.jpg";
import project_img from "../../public/assets/images/project.jpg";
import frame_hand from "../../public/assets/images/frame_hand.png";
import handImag from "../../public/assets/images/hand.png";

import Image from "next/image";
import DonationForm from "./forms/DonationForm";

export const ProjectInfo = ({
  title,
  userName,
  about,
  taken,
  goal,
  left,
  img,
}) => {
  const [openDonationForm, setOpenDonationForm] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const endDate = new Date(left);
    const today = new Date();

    const timeDiff = endDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    setDaysLeft(daysRemaining);
  }, [left]);

  const handleDonationForm = () => {
    openDonationForm === false
      ? setOpenDonationForm(true)
      : setOpenDonationForm(false);
  };
  const styles = {
    project_size: {
      minHeight: "600px",
      borderRadius: "10px",
    },

    profile_size: {
      height: "40px",
      width: "40px",
      borderRadius: "10px",
    },
    project_class: `h-full w-auto object-cover `,
    page: `grid md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 mx-5 my-2`,
    left: `flex ml-10 mt-12 col-span-2  rounded-3xl justify-center items-center`,
    right: `xl:col-span-3 lg:col-span-2 mx-8 mt-12`,
    short_profile: `flex mb-10`,
    prof_title: `text-4xl mb-10 text-left lg:me-24 xl:me-48`,
    prof_name: `ml-5 mt-2 font-bold text-orange-800`,
    inproject: `grid grid-cols-2 border-y-2 border-black`,
    intoleft: `col-span-1 my-8`,
    intoright: `col-span-1 my-8 border-s-2 border-black`,
    about_title: `text-lg text-left`,
    about: `text-sm text-left mt-5 2xl:me-40 xl:me-20 me-10 text-gray-500`,
    ul: `xl:flex justify-around text-start mx-3`,
    raised_li: `py-2 px-4 text-sm`,
    goal_li: `bg-orange-500 py-2 px-4 rounded-md text-sm`,
    numbers: `text-2xl`,
    percent: `bg-gray-200 w-5/6 h-3 rounded-md left-10 mt-10 mx-auto`,
    onpercent: `bg-orange-500 w-5/6 h-3 rounded-md left-10`,
    left_day: `flex mt-8 justify-center text-sm`,
    button: `bg-black hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md border border-black mt-14 w-80 text-center ms-0 md:w-100`,
    button_pos: `flex justify-center md:justify-start`,
  };

  
  return (
    <div className={styles.page}>
      <aside className={styles.left}>
        <img
          src={img}
          className={styles.project_class}
          style={styles.project_size}
          width={200}
          height={300}
          alt="Picture of thanking"
         
        />
      </aside>
      <section className={styles.right}>
        <h2 className={styles.prof_title}>{title}</h2>
        <div id="profile" className={styles.short_profile}>
          <Image
            width={295}
            height={165}
            src={user_img}
            alt="Picture of thanking"
           
            style={styles.profile_size}
          />
          <p className={styles.prof_name}>{userName}</p>
        </div>
        <div id="inProject" className={styles.inproject}>
          <div id="intoProjectLeft" className={styles.intoleft}>
            <h4 className={styles.about_title}>About project</h4>
            <p className={styles.about}>{about}</p>
          </div>
          <div id="intoProjectRight" className={styles.intoright}>
            <ul className={styles.ul}>
              <li className={styles.raised_li}>
                Raised:<br></br>
                <h4 className={styles.numbers}>${taken}</h4>
              </li>
              <li className={styles.goal_li}>
                Goal:<br></br>
                <h4 className={styles.numbers}>${goal}</h4>
              </li>
            </ul>
            <div id="line" className={styles.percent}>
              <div id="percentage" className={styles.onpercent}></div>
            </div>
            <span className={styles.left_day}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 -mt-2 me-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              {daysLeft} days left
            </span>
          </div>
        </div>
        <a className={styles.button_pos}>
          <button className={styles.button} onClick={handleDonationForm}>
            Fund this project
          </button>
        </a>
        <DonationForm
          openDonationForm={openDonationForm}
          setOpenDonationForm={setOpenDonationForm}
        />
      </section>
    </div>
  );
};

//<img src={frame_hand} className='z-10 ' style={styles.frame_size} ></img>
// if objects get wanted..
// frame_size: { minHeight: "400px", height: "820px", objectfit: "cover"}
