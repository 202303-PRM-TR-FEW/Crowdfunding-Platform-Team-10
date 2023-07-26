"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import { comment } from "postcss";

const Comments = () => {
  const { comments } = useAuth();

  const allComments = comments.map((comment) => {
    <div className="bg-lightGreen rounded-xl shadow-lg p-6 mb-4 w-[200px] mx-auto">
      <div className="flex items-center space-x-4 mb-3">
        <img
          className="w-12 h-12 rounded-full"
          src={comment.userImg}
          alt="User Image"
        />
        <p className="font-bold text-black text-xl">{comment.userName}</p>
      </div>
      <p className="text-black text-base">{comment.text}</p>
    </div>;
  });

  return (
    <div className="p-10 flex-wrap text-center py-20 md:px-12 container mx-auto">
      {allComments}
    </div>
  );
};

export default Comments;
