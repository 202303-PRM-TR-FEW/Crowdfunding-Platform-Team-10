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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

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
    background: "#489E92",
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    padding: "20px",
    color: "white",
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
  const blackText = {
    color: "black",
  };

  const advantageListStyle = {
    marginTop: "20px",
    color: "white",
  };

  const advantageItemStyle = {
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  return (
    <ThemeProvider theme={theme}>
      <section style={containerStyle}>
        <div className="grid lg:grid-cols-2 gap-8">
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
                  className="custom-white-button mt-3 px-10 sm:w-2/6 self-center"
                  style={blackText}
                >
                  Subscribe
                </button>

                <p className="spam-message pt-2 text-center" style={whiteText}>
                  We will not spam you 🤞🏼
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}
