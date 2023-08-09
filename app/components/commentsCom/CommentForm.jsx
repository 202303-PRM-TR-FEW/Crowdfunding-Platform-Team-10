"use client";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";

import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const CommentForm = ({ params }) => {
  const [commentText, setCommentText] = useState("");
  const t = useTranslations("CommentForm");

  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (user && user.email) {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );

      const fetchUserData = async () => {
        try {
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();

            setCurrentUser({ ...userData, id: user.uid });
          } else {
            console.log("no data matched");
            setCurrentUser({});
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };

      fetchUserData();
    }
  }, [user]);
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
    <div className="mt-5 w-full">
      <div className="title flex flex-col gap-3 w-full">
        <h3 className="text-base font-bold text-lightGreen w-full">
          {t("leave-com")}
        </h3>
      </div>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleFormSubmit}>
        <div className="mt-3 w-full">
          <textarea
            label={t("message")}
            placeholder={t("text")}
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border-[#00c1a2] border-2 w-full p-2 rounded-lg"
            rows="4"
            required
          />
        </div>
        <button className="btn-primary w-full">{t("btn-submit")}</button>
      </form>
    </div>
  );
};

export default CommentForm;
