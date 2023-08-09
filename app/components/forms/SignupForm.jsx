"use client";
import React, { useState } from "react";
import { useRouter } from "next-intl/client";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import { FileUpload } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import { countries } from "@/data/countries";
import Link from "next-intl/link";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import Image from "next/image";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is Required !")
      .email("Use a Valid Email"),
    password: yup.string().required("Password is Required !"),
    name: yup.string().required("Full Name is Required !"),
    bio: yup.string().required("Bio is Required !"),
    country: yup.string().required("Country is Required !"),
    userImg: yup.mixed().required("User Picture is Required !"),
  })
  .required();

const SignupForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      bio: "",
      userImg: null,

      country: "",
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const { user, signup } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await signup(data.email, data.password);
      const user = res.user;
      handleImageUploadAndUserData(data, user.uid);
    } catch (e) {
      toast.error(e.code, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleImageUploadAndUserData = async (data, userId) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, data.userImg[0].name);
      const snapshot = await uploadBytes(storageRef, data.userImg[0]);

      const imgUrl = await getDownloadURL(snapshot.ref);

      await setDoc(doc(db, "users", userId), {
        name: data.name,
        bio: data.bio,
        userImg: imgUrl,

        email: data.email,
        timeStamp: serverTimestamp(),
        country: data.country,
      });

      router.push("/profile");
    } catch (e) {
      if (e.code == "auth/email-already-in-use") {
        toast.error("This email already exists.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (e.code == "auth/weak-password") {
        toast.error("Passwords must have at least 6 characters.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(e.code, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  const t = useTranslations("SignupForm");

  return (
    <div className="grid lg:grid-cols-5 h-max lg:mt-16 drop-shadow-2xl max-w-4xl md:pt-6">
      <div className="lg:col-span-2 bg-gradient-to-tl from-lightGreen to-teal-700 flex flex-col justify-center items-center md:p-6 p-12 text-center gap-6 lg:rounded-l rounded-b lg:rounded-br-none lg:rounded-tr-none order-2 lg:order-1">
        <p className=" px-10 lg:px-0 text-2xl md:text-3xl font-bold text-white">
          {t("sideHeader")}
        </p>

        <Link href="/login">
          <button className="btn-white w-[140px]  py-2 px-12 self-center font-bold">
            {t("loginButton")}
          </button>
        </Link>
      </div>
      <div className="lg:col-span-3 grid gap-2 text-center h-full bg-[#fffb] lg:rounded-r rounded-t lg:rounded-bl-none order-1 lg:order-2">
        <div className="grid gap-4 w-full  py-10 px-4">
          <Container maxWidth="xs">
            <div className="grid justify-center items-center h-full">
              <p className="text-center text-gray-900  header-3 px-10 md:px-20">
                {t("header")}
              </p>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mt-6">
                  <TextField
                    label={t("email")}
                    fullWidth
                    type="email"
                    defaultValue="test"
                    {...register("email")}
                    variant="standard"
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.email && <InfoIcon fontSize="small" />}
                    {errors.email?.message}
                  </Typography>
                </div>
                <div>
                  <TextField
                    label={t("password")}
                    fullWidth
                    variant="standard"
                    type="password"
                    {...register("password")}
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.password && <InfoIcon fontSize="small" />}
                    {errors.password?.message}
                  </Typography>
                </div>
                <div>
                  <TextField
                    label={t("fullName")}
                    fullWidth
                    variant="standard"
                    type="text"
                    {...register("name")}
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.name && <InfoIcon fontSize="small" />}
                    {errors.name?.message}
                  </Typography>
                </div>
                <div>
                  <TextField
                    label={t("bio")}
                    fullWidth
                    variant="standard"
                    type="text"
                    {...register("bio")}
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.bio && <InfoIcon fontSize="small" />}
                    {errors.bio?.message}
                  </Typography>
                </div>
                <div>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {t("country")}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="country"
                          onChange={onChange}
                          defaultValue=""
                        >
                          {countries.map((country) => {
                            return (
                              <MenuItem
                                key={country.label}
                                value={country.label}
                              >
                                <div className="flex gap-2 items-center">
                                  <span>
                                    <Image
                                      unoptimized
                                      className="rounded-none"
                                      loading="lazy"
                                      width={20}
                                      height={10}
                                      src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                    />
                                  </span>
                                  <span>{country.label}</span>
                                </div>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.country && <InfoIcon fontSize="small" />}
                    {errors.country?.message}
                  </Typography>
                </div>
                <div>
                  <TextField
                    fullWidth
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <FileUpload />
                        </InputAdornment>
                      ),
                    }}
                    icon={<FileUpload />}
                    accept="image/*"
                    id="userImg"
                    name="userImg"
                    type="file"
                    label={t("userPicture")}
                    {...register("userImg")}
                    sx={{ input: { cursor: "pointer" } }}
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.userImg && <InfoIcon fontSize="small" />}
                    {errors.userImg?.message}
                  </Typography>
                </div>

                <button
                  className="mt-8 btn-primary w-4/6 self-center "
                  type="submit"
                  variant="filled"
                  fullWidth
                >
                  {t("signupButton")}
                </button>
              </form>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
