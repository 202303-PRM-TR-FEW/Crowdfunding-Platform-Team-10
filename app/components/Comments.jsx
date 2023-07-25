"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";

const Comments = () => {
  const { auth } = useAuth();
  const [comments, setComments] = useState([]);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

  useEffect(() => {
    const fetchRandomComments = async () => {
      try {
        const commentsCollectionRef = collection(db, "comments");
        const unsubscribe = onSnapshot(commentsCollectionRef, (snapshot) => {
          const fetchedComments = snapshot.docs.map((doc) => doc.data());

          // Shuffle the comments array randomly
          const shuffledComments = shuffleArray(fetchedComments);

          setComments(shuffledComments);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchRandomComments();
  }, [auth]);

  useEffect(() => {
    // Update the current comment index randomly
    const randomIndex = Math.floor(Math.random() * comments.length);
    setCurrentCommentIndex(randomIndex);
  }, [comments]);

  const shuffleArray = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  const currentComment = comments[currentCommentIndex];

  return (
    <div className="p-10 text-center py-20 md:px-12 container mx-auto">
      {currentComment && (
        <div className="bg-lightGreen rounded-xl shadow-lg p-6 mb-4 w-[24rem] mx-auto">
          <div className="flex items-center space-x-4 mb-3">
            <img
              className="w-12 h-12 rounded-full"
              src={currentComment.userImg}
              alt="User Image"
            />
            <p className="font-bold text-black text-xl">
              {currentComment.userName}
            </p>
          </div>
          <p className="text-black text-base">{currentComment.text}</p>
        </div>
      )}
    </div>
  );
};

export default Comments;
