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
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { auth } from "../config/firebase";
import { useRouter } from "next/navigation";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersInfo, setUsersInfo] = useState(null);
  const [projects, setProjects] = useState(true);
  const [donations, setDonations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          contributions: [],
          projects: [],
          bio: user.bio,
          country: user.country,
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
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      function isEmailMatching(email) {
        return email === user.email;
      }
      const isEmailFound = usersInfo.some((userInfo) =>
        isEmailMatching(userInfo.email)
      );

      if (!isEmailFound) {
        await setDoc(doc(db, "users", user.uid), {
          // ...userData,
          name: user.displayName,
          bio: "",
          userImg: user.photoURL,

          email: user.email,
          timeStamp: serverTimestamp(),
          country: "",
        });
        console.log("user created in db");
        router.push("/account");
      } else {
        console.log("user already exist in db");
        router.push("/profile");
      }

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    });
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
    const q = query(collection(db, "comments"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let commentsArr = [];
      QuerySnapshot.forEach((doc) => {
        commentsArr.push({ ...doc.data(), id: doc.id });
      });
      setDonations(commentsArr);
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
  }, [user, usersInfo, currentUser]);

  function formatNumber(number) {
    const suffixes = ["", "K", "M", "B", "T"];
    const numString = number.toString();
    const numDigits = numString.length;
    const suffixNum = Math.floor((numDigits - 1) / 3);

    if (suffixNum === 0 || numDigits <= 4) {
      return number.toString();
    } else {
      let shortNumber = parseFloat(
        (number / Math.pow(1000, suffixNum)).toPrecision(3)
      );
      if (shortNumber % 1 !== 0) {
        shortNumber = shortNumber.toFixed(1);
      }
      return shortNumber + suffixes[suffixNum];
    }
  }

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
        comments,
        currentUser,
        googleLogIn,
        formatNumber,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
