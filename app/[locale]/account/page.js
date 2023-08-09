"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import EditUser from "@/components/forms/EditUser";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import CardInfo from "./CardInfo";

const Page = () => {
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

  useEffect(() => {
    if (currentUser) {
      if (currentUser.country === "" || currentUser.bio === "") {
        setOpenEditUserForm(true);
      }
    }
  }, [currentUser]);

  const [openEditUserForm, setOpenEditUserForm] = useState(false);

  const handleEditUser = () => {
    setOpenEditUserForm(!openEditUserForm);
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toDateString();
  }

  return (
    <div className=" bg-gradient-to-t from-transparent to-teal-50 relative bg-no-repeat overflow-hidden bg-cover">
      <div style={circleBackgroundStyle}></div>
      <CardInfo
        currentUser={currentUser}
        handleEditUser={handleEditUser}
        formatTimestamp={formatTimestamp}
      />
      <EditUser
        currentUser={currentUser}
        openEditUserForm={openEditUserForm}
        setOpenEditUserForm={setOpenEditUserForm}
        setCurrentUser={setCurrentUser}
      />
      <div style={circleBackgroundStyle2}></div>
    </div>
  );
};

export default Page;

const circleBackgroundStyle = {
  position: "absolute",
  top: "-50px",
  right: "50px",
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  background: "#00c1a1a5",
  transform: "rotate(45deg)",
  zIndex: -1,
  animation: `moveCircle2 10s linear infinite`,
};
const circleBackgroundStyle2 = {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "500px",
  height: "500px",
  borderRadius: "50%",
  background: "#00c1a144",
  zIndex: -1,
  filter: "blur(20px)",
  transform: "rotate(45deg)",

  animation: `moveCircle2  10s linear infinite`,
};
