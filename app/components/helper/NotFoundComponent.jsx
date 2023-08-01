import React from "react";
import NotFoundImage from "../../../public/assets/images/notFound.png";
import Image from "next/image";
import Link from "next/link";

const NotFoundComponent = () => {
  return (
    <div className=" bg-gradient-to-t from-transparent to-teal-50 relative overflow-hidden">
      <div className="p-16 ">
        <div className="text-center">
          <h2 className="header-3 py-8"> Sorry Page Not Found</h2>
          <Link href="/">
            <button className="btn-primary -mb-8"> Home Page</button>
          </Link>
        </div>
        <div className="mx-auto w-2/3">
          <Image className="w-full h-full" src={NotFoundImage} alt="404" />
        </div>
      </div>
      <div style={circleBackgroundStyle}></div>
    </div>
  );
};

export default NotFoundComponent;
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
  overFlow: "hidden",
};
