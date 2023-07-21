"use client";
import emailjs from "emailjs-com";
import React, { useRef } from "react";
import {
  Input,
  Button,
  ThemeProvider,
  createTheme,
  Grid,
  TextField,
  Paper,
} from "@mui/material";

export default function NewsLetterCard() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00c1a2",
      },
      action: {
        // Customize the autofill background color
        hover: "#00c1a2", // Replace with your desired color
        selected: "#00c1a2", // Replace with your desired color
      },
    },
  });

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”

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

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle farthest-corner at 1.5% 1.4%, #489E92, #E3F4F2)",
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    padding: "20px",
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

  return (
    <ThemeProvider theme={theme}>
      <section style={containerStyle}>
        <div className="grid lg:grid-cols-2 gap-8 ">
          <div className="p-14 flex flex-col gap-4 justify-center text-center">
            <p className="header-3">
              Subscribe now and be at the forefront of change!
            </p>
            <p className="sub-header">
              Sign up for our free newsletter to receive our monthly digest of
              the best causes. Stay informed, get inspired, and make a
              difference by joining our community of passionate individuals
              dedicated to shaping the world for the better!
            </p>
          </div>
          <div style={blurredCardStyle}>
            <div className="p-5 sm:p-10 flex flex-col gap-4 justify-center text-center">
              <p className="header-4">Subscribe to our newsletter</p>
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
                  className="btn-primary mt-3 px-10 sm:w-2/6 self-center"
                >
                  Subscribe
                </button>

                <p className="spam-message text-basicgray pt-2 text-center">
                  We won't spam you 🤞🏼
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}
