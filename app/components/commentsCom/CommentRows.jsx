import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function CommentRows({ id }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "projectsComments"),
      where("project", "==", id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let commentsArr = [];
      querySnapshot.forEach((doc) => {
        commentsArr.push({ ...doc.data(), id: doc.id });
      });
      setComments(commentsArr);
    });

    return () => unsubscribe();
  }, [id]);
  console.log(comments);

  return (
    <div className="flex flex-col gap-2 w-full my-2 ">
      {comments.map((comment, index) => (
        <div
          key={comment.id}
          className={`flex items-center w-full justify-start gap-1 rounded-lg p-4 ${
            commentColors[index % commentColors.length]
          }`}
        >
          <div className="flex-shrink-0 mr-3">
            <Image
              className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
              src={comment.userImg}
              alt={comment.userName}
              width={20}
              height={20}
            />
          </div>
          <div className="flex-1  rounded-lg   leading-relaxed">
            <strong>{comment.userName}</strong>
            <span className="text-xs  text-gray-400 mx-2">
              {formatTime(comment.commintTime.seconds)}
            </span>
            <p className="text-sm">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const formatTime = (seconds) => {
  const currentDate = Math.floor(Date.now() / 1000); // Get current time in seconds
  const timeDifference = currentDate - seconds;

  if (timeDifference < 60) {
    return `${timeDifference} sec ago`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} min ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} hour ago`;
  } else {
    const days = Math.floor(timeDifference / 86400);
    return `${days} day ago`;
  }
};
const commentColors = [
  "bg-[#00c1a12f]",
  "bg-[#f5d20e28]",
  "bg-[#C3EDC0]",
  "bg-[#F8E8EE]",
  "bg-[#DAF5FF]",
];
