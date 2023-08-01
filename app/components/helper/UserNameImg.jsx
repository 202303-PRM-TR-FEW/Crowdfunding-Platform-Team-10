import React from "react";

function UserNameImg({ userImg, userName }) {
  return (
    <div className="flex items-center justify-start gap-3 ">
      <div className="w-[45px]">
        <img src={userImg} alt="user img" className=" w-11 h-11 rounded-full" />
      </div>
      <div>
        <p className="text-md color-yellow">{userName} </p>
        <p className=" text-blue-gray-400 text-xs">
          organizing this fundraiser.
        </p>
      </div>
    </div>
  );
}

export default UserNameImg;
