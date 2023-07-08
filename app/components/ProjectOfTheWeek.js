import React from "react";
import img from "../../public/assets/images/projecttheweek.png";
import Image from "next/image";
import CustomizedProgressBars from "./helper/ProgressBar";

export default function ProjectOfTheWeek({ title, owner, about, taken, goal }) {
  const styles = {
    page: `grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center`,
  };
  return (
    <>
      <h1 className="header-2 ">Project of the week</h1>
      <div className={styles.page}>
        <div className="w-full ">
          <Image src={img} alt="Project of the week" objectFit="cover" />
        </div>
        <div className="w-10/12">
          <h3 className="header-3 lg:w-1/2">
            Help us release cookbook for parents and kids
          </h3>

          <p className="sub-header py-4 lg:py-7">
            We want to create beautiful and helpful cooking book for parents and
            kids to have fun in kitchen.
          </p>
          <CustomizedProgressBars progressValue={60} />

          <div className="grid grid-cols-2 py-4 lg:py-7">
            <div>
              <h4 className="header-4 ">Raised:</h4>
              <h3 className="header-3">${1500}</h3>
            </div>
            <div>
              <h4 className="header-4">Goal:</h4>
              <h3 className="header-3">${2800}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//<img src={frame_hand} className='z-10 ' style={styles.frame_size} ></img>
// if objects get wanted..
// frame_size: { minHeight: "400px", height: "820px", objectFit: "cover"}
