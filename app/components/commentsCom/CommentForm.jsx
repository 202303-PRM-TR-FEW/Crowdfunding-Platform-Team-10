"use client";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";

import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const CommentForm = ({ params }) => {
  const [commentText, setCommentText] = useState("");
  const t = useTranslations("CommentForm");

  const { currentUser } = useAuth();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const commentsCollectionRef = collection(db, "projectsComments");
      await addDoc(commentsCollectionRef, {
        commintTime: new Date(),
        text: commentText,
        project: params.id,
        userID: currentUser.id,
        userImg: currentUser.userImg,
        userName: currentUser.name,
      });

      setCommentText("");
      toast.success(`${t("success-msg")}`);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="mt-5">
      <div className="title flex flex-col gap-3 ">
        <h3 className="text-base font-bold text-lightGreen">
          {t("leave-com")}
        </h3>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <div className="mt-3">
          <textarea
            label={t("message")}
            placeholder={t("text")}
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border-[#00c1a2] border-2 w-full   p-2 rounded-lg"
            rows="4"
            required
          />
        </div>
        <button className="btn-primary w-full"> {t("btn-submit")}</button>
      </form>
    </div>
  );
};

export default CommentForm;
