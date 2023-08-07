import React, { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";

import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const CommentForm = ({ params }) => {
  const [commentText, setCommentText] = useState("");

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
      toast.success("Succesfuly submited your comment!");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="mt-5">
      <div className="title flex flex-col gap-3 ">
        <h3 className="text-base font-bold text-lightGreen">
          Leave A Comment :
        </h3>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <div className="mt-3 w-full">
          <textarea
            label="Message"
            placeholder="Text..."
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border-[#00c1a2] border-2 w-full   p-2 rounded-lg"
            rows="4"
            required
          />
        </div>
        <button className="btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;
