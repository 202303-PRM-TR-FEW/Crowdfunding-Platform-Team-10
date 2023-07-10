"use client";

import { ProjectInfo } from "@/components/ProjectInfo";
import { db } from "../config/firebase";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoaderStyle from "@/components/helper/LoaderStyle";

function Project({ params }) {
  const [data, setData] = useState(null);
  //this code pass data to single project page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "projects", params.slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []);

  if (data === null || !data) {
    return <LoaderStyle />;
  }

  return (
    <ProjectInfo
      title={data.name}
      userName={data.creator.userName}
      about={data.about}
      taken={data.raised}
      goal={data.goal}
      left={data.endingDate}
      img={data.url}
      id={params}
    />
  );
}

export default Project;
