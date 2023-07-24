"use client";

import { ProjectInfo } from "@/components/ProjectInfo";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";

function Project({ params }) {
  const [data, setData] = useState(null);
  const { formatNumber } = useAuth();
  //this code pass data to single project page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "projects", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Increment the viewCount field when fetching the project
          const projectData = docSnap.data();
          const updatedData = {
            ...projectData,
            viewCount: projectData.viewCount + 1,
          };
          await updateDoc(docRef, updatedData);

          setData(updatedData); // Set the state with the updated data
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [params.id]);

  function formatViewCount(count) {
    return formatNumber(count);
  }
  const formattedViewCount = formatNumber(data?.viewCount || 0);

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
      viewCount={formattedViewCount}
    />
  );
}

export default Project;
