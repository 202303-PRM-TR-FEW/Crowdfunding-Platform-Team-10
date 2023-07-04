"use client";
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //fetch the collaction database u want by changing the "project"
    const q = query(collection(db, "project"));
    const unscbscribe = onSnapshot(q, (QuerySnapshot) => {
      let projectsArr = [];
      QuerySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });
      setProjects(projectsArr);
      console.log(projectsArr);
    });
    return () => unscbscribe();
  }, []);

  const propro = projects.map((pro) => {
    return (
      <div key={pro.id}>
        {pro.title}
        <img src={pro.image} width={200} height={200} alt={pro.title} />
      </div>
    );
  });

  return <>{propro}</>;
}
