"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ProjectInfo } from "@/components/ProjectInfo";
import { useEffect, useState } from "react";

function Project({ params }) {
  const [projectData, setProjectData] = useState(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);
    const name = queryParams.get("name");
    const userName = queryParams.get("userName");
    const about = queryParams.get("about");
    const raised = queryParams.get("raised");
    const goal = queryParams.get("goal");
    const endingDate = queryParams.get("endingDate");
    const url = queryParams.get("url");

    const project = {
      name,
      userName,
      about,
      raised,
      goal,
      endingDate,
      url,
    };

    setProjectData(project);
  }, [pathname, searchParams]);

  console.log(projectData);
  if (!projectData) {
    return <p>Loading project data...</p>;
  }
  return (
    <ProjectInfo
      title={projectData.name}
      userName={projectData.userName}
      about={projectData.about}
      taken={projectData.raised}
      goal={projectData.goal}
      left={projectData.endingDate}
      img={projectData.url}
    />
  );
}

export default Project;
