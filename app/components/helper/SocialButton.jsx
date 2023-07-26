import Image from "next/image";
import React from "react";

const SocialButton = ({
  width = 70,
  height = 70,
  provider,
  src = "",
  alt = "image",
  handleShare,
}) => {
  return (
    <div
      className=" sm:scale-60 md:scale-80 lg:scale-100 hover:scale-[1.1] cursor-pointer hover:-translate-y-[6px] transition-all duration-300 ease-in-out"
      onClick={() => {
        handleShare(provider);
      }}
    >
      <Image width={width} height={height} src={src} alt={alt} />
    </div>
  );
};

export default SocialButton;
