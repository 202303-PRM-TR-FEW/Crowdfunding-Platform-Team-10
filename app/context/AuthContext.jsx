"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/config/firebase";

import { auth } from "../config/firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersInfo, setUsersInfo] = useState(null);
  const [projects, setProjects] = useState(true);
  const [donations, setDonations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          contributions: [],
          projects: [],
        });
      } else {
        setUser(null);
      }
      setLoading(false);
      console.log(user);
    });

    return () => unsubscribe();
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogIn = () => {
    const provider = new GoogleAuthProvider;
    signInWithPopup(auth,provider)
  };



  const logout = async () => {
    setUser(null);
    setCurrentUser(null);
    await signOut(auth);
  };

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let usersArr = [];
      QuerySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id });
      });
      setUsersInfo(usersArr);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "projects"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let projectsArr = [];
      QuerySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });
      setProjects(projectsArr);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "donations"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let donationsArr = [];
      QuerySnapshot.forEach((doc) => {
        donationsArr.push({ ...doc.data(), id: doc.id });
      });
      setDonations(donationsArr);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (usersInfo && user !== null) {
      const userCurrent = usersInfo.find(
        (usersinfo) => usersinfo.id === user.uid
      );
      if (userCurrent) {
        setCurrentUser(userCurrent);
      } else {
        setCurrentUser(null);
      }
    }
    setLoading(false);
    console.log(currentUser);
  }, [user, usersInfo]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        usersInfo,
        projects,
        donations,
        currentUser,
        googleLogIn
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
