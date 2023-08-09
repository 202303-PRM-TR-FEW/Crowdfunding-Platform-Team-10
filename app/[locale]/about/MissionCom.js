"use client";

const MissionCom = () => {
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
  };
  const circleBackgroundStyle2 = {
    position: "absolute",
    bottom: "10px",
    left: "50px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "#00c1a1a5",
    transform: "rotate(45deg)",
    zIndex: -1,
    filter: "blur(20px)",
    animation: `moveCircle 10s linear infinite`,
  };

  return (
    <div
      className="justify-center flex relative overflow-hidden bg-gray-100"
      style={{ backdropFilter: "blur(14px)" }}
    >
      <div style={circleBackgroundStyle}></div>
      <section className="text-center py-20 md:py-40 container px-5 md:px-0">
        <p className="header-3Green pb-10 text-center ">Our Mission</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-10 md:gap-20 ">
          <div className="text-center lg:text-right col-span-1">
            <p className="header-3">
              Making life standards better for everyone and everything{" "}
            </p>
            <p className="sub-header py-10">
              We help people achieve independence by making starting, running,
              and growing a business easier. We believe the future of commerce
              has more voices, not fewer, so we are reducing the barriers to
              business ownership to make commerce better for everyone.
            </p>
          </div>
          <div className=" text-center lg:text-left col-span-1">
            <p className="header-3">
              Being the voice of those who need a help{" "}
            </p>
            <p className="sub-header py-10">
              We help people achieve independence by making starting, running,
              and growing a business easier. We believe the future of commerce
              has more voices, not fewer, so we are reducing the barriers to
              business ownership to make commerce better for everyone.
            </p>
          </div>
        </div>
      </section>
      <div style={circleBackgroundStyle2}></div>
    </div>
  );
};

export default MissionCom;
