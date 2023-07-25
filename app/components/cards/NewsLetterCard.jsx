"use client";
import emailjs from "emailjs-com";
import React, { useRef } from "react";
import { ThemeProvider, createTheme, TextField } from "@mui/material";

export default function NewsLetterCard() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      action: {
        // Customize the autofill background color
        hover: "#FFFFFF", // Replace with your desired color
        selected: "#FFFFFF", // Replace with your desired color
      },
    },
  });
  const containerStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#489e939d",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    padding: "20px",
    color: "white",
  };
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
  const blurredCardStyle = {
    position: "relative",
    width: "100%",
    position: "button",
    height: "100%",
    background: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(14px)",
    borderRadius: "30px",
    padding: "20px",
  };
  const imageContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
  };
  const whiteText = {
    color: "white",
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const REARCT_APP_SERVICE_ID = "service_mfq6ump";
    const REARCT_APP_TEMPLATE_ID = "template_cwoodxx";
    const REARCT_APP_USER_ID = "0DOptxtQwVjFVWDq4";

    emailjs
      .sendForm(
        REARCT_APP_SERVICE_ID,
        REARCT_APP_TEMPLATE_ID,
        form.current,
        REARCT_APP_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <section style={containerStyle}>
        <div style={circleBackgroundStyle}  ></div>
        <div className="grid lg:grid-cols-2 gap-8 container lg:py-24 ">
          <div className="p-14 flex flex-col gap-4 justify-center text-center">
            <p className="header-3">
              Subscribe now and be at the forefront of change!
            </p>
            <p className="sub-header pb-1" style={whiteText}>
              Sign up for our free newsletter to receive our monthly digest of
              the best causes. Stay informed, get inspired, and make a
              difference by joining our community of passionate individuals
              dedicated to shaping the world for the better!
            </p>
          </div>
          <div style={blurredCardStyle}>
            <div className="p-1 sm:p-10 flex flex-col gap-4 justify-center text-center">
              <p className="header-4 pb-2">Subscribe to our newsletter</p>
              <div style={imageContainer}>
                <img
                  src="/assets/images/newsletter_image.png"
                  alt="Newsletter Image"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
              <form
                ref={form}
                onSubmit={sendEmail}
                className="md:px-24 flex flex-col"
              >
                <TextField
                  id="outlined-email-input"
                  label="Email Address"
                  type="email"
                  name="to_email"
                />

                <button
                  type="submit"
                  className="rounded-lg my-3 px-10 py-2  self-center bg-[#f0bd07] text-[#000]"
                >
                  Subscribe
                </button>

                <p className="spam-message pt-2 text-center  text-[#767676]">
                  We will not spam you 🤞🏼
                </p>
              </form>
            </div>
          </div>
        </div>
        <div style={circleBackgroundStyle2} ></div>
      </section>
    </ThemeProvider>
  );
}
