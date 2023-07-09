import React from "react";

import CustomizedProgressBars from "./helper/ProgressBar";

export default function ProjectOfTheWeek({ projectOfWeek }) {
  const styles = {
    page: `grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center`,
  };
  return (
    <>
      <h1 className="header-2 ">Project of the week</h1>
      <div className={styles.page}>
        <div className="w-full ">
          <img
            src={projectOfWeek.url}
            alt="Project of the week"
         
          />
        </div>
        <div className="w-10/12">
          <h3 className="header-3 lg:w-1/2">
          {projectOfWeek.name}
          </h3>

          <p className="sub-header py-4 lg:py-7">
      {projectOfWeek.about}
          </p>
          <CustomizedProgressBars progressValue={60} />

          <div className="grid grid-cols-2 py-4 lg:py-7">
            <div>
              <h4 className="header-4 ">Raised:</h4>
              <h3 className="header-3">${projectOfWeek.raised}</h3>
            </div>
            <div>
              <h4 className="header-4">Goal:</h4>
              <h3 className="header-3">${projectOfWeek.goal}</h3>
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
