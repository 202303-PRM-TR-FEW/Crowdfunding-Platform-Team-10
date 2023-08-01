import React from "react";
import { Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
function UserNameImg({ userImg, userName }) {
  return (
    <div className="flex items-center justify-start gap-3 ">
      <div className="w-[45px]">


        {userImg ? (
          <Avatar alt={userName} src={userImg} />
        ) : (
          <AccountCircle fontSize="large" />
        )}

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
