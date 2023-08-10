import NotFoundComponent from "@/components/helper/NotFoundComponent";
import React from "react";
import { Fade } from "react-awesome-reveal";

const page = () => {
  return (
    <>
      <Fade>
        <NotFoundComponent />
      </Fade>
    </>
  );
};

export default page;
