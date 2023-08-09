"use client";
import emailjs from "emailjs-com";
import React, { useRef } from "react";
import { TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InfoIcon from "@mui/icons-material/Info";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export default function NewsLetterCard() {
  const t = useTranslations("NewsLetterCard");
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

  const form = useRef();

  const schema = yup
    .object({
      to_email: yup
        .string()
        .required(`${t("email")}`)
        .email(`${t("valid")}`),
    })
    .required();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      to_email: "",
    },
    resolver: yupResolver(schema),
  });

  const sendEmail = () => {
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
  };
  const onSubmit = (data, form) => {
    sendEmail(form);
    toast.success("Subscribed to OpenHanded Newsletter!");
    reset();
  };
  return (
    <section style={containerStyle}>
      <div style={circleBackgroundStyle}></div>
      <div className="grid lg:grid-cols-2 gap-8 container lg:py-24 items-center justify-between mx-auto">
        <div className="lg:p-14 p-2 flex flex-col gap-4 justify-center lg:text-left text-center">
          <h2 className="header-2 lg:text-left text-center my-3">
            {t("header1")}
          </h2>
          <p className="pb-1 lg:my-3 text-white lg:text-left text-center text-base md:text-lg lg:text-xl">
            {t("paragraph")}
          </p>
        </div>
        <div style={blurredCardStyle}>
          <div className="p-1 sm:p-10 flex flex-col gap-4 justify-center text-center">
            <p className="header-4 pb-2">{t("header2")}</p>
            <div style={imageContainer}>
              <img
                src="/assets/images/newsletter_image.png"
                alt="Newsletter Image"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
            <form
              ref={form}
              onSubmit={handleSubmit(onSubmit)}
              className="md:px-20 flex flex-col"
            >
              <TextField
                id="email"
                label={t("email-input-area")}
                type="email"
                name="to_email"
                variant="standard"
                {...register("to_email")}
              />
              <Typography
                sx={{ marginY: "10px" }}
                variant="small"
                className="flex items-center gap-1 font-normal text-red-800 "
              >
                {errors.to_email && <InfoIcon fontSize="small" />}
                {errors.to_email?.message}
              </Typography>

              <button type="submit" className="btn-yelGreen ">
                {t("btn")}
              </button>

              <p className="spam-message pt-2 text-center text-[#00c1a2] font-extrabold ">
                {t("note-to-user")}
              </p>
            </form>
          </div>
        </div>
      </div>
      <div style={circleBackgroundStyle2}></div>
    </section>
  );
}
