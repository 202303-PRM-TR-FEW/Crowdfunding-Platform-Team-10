import React from "react";

function Shape() {
  return (
    <div className="absolute sm:bottom-0 sm:top-10 top-[-100px] right-[-150px] w-[900px] h-[900px] z-[-1] p-0 m-0">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#00c1a114"
          d="M57.4,-24.1C63.3,-0.5,49.4,24.1,29.3,38.2C9.2,52.3,-17,55.9,-29.5,45.6C-42,35.4,-40.8,11.2,-33.6,-14.1C-26.4,-39.5,-13.2,-66.1,6.3,-68.1C25.8,-70.2,51.5,-47.6,57.4,-24.1Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}

export default Shape;
