"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "@/config/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { auth } from "../config/firebase";
import { useRouter } from "next-intl/client";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    });
  };

  const logout = async () => {
    setUser(null);

    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        googleLogIn,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
