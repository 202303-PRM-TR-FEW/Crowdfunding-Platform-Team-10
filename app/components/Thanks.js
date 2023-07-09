import React from "react";
import handImag from "../../public/assets/images/hand.png";
import Image from "next/image";

export const Thanks = () => {
  const styles = {
    image: `w-3/4 mx-auto scale-75`,
    image_size: {
      minHeight: "400px",
  
    },
    title: `text-6xl font-bold mb-4`,
    text: `text-2xl mb-10`,
    button_left: `bg-black hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md border border-black mx-5 mb-5 w-80 text-lg`,
    button_right: `bg-white hover:bg-orange-500 text-black font-bold py-2 px-4 rounded-md border border-black mx-5 w-80 text-lg`,
  };
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Image
        width={295}
        height={165}
        src={handImag}
        alt="Picture of thanking"
      
        className={styles.image}
        style={styles.image_size}
      />

      <div>
        <h4 className={styles.title}>Thank you</h4>
        <p className={styles.text}>for supporting us!</p>
        <button className={styles.button_left}>Make another donation</button>
        <button className={styles.button_right}>Go to home page</button>
      </div>
    </div>
  );
};
