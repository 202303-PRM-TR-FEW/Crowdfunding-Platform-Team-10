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

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is Required !")
      .email("Use a Valid Email"),
    message: yup.string().required("Message is Required !"),
    name: yup.string().required("Full Name is Required !"),
  })
  .required();

const CommentForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      message: "",
      projects: [],
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
        message: data.message,
        email: data.email,
        timeStamp: serverTimestamp(),
      });
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
        // For other errors, show a generic error message
        toast.error(e.code, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <div className="border-[1px] border-lightGreen py-3 px-4">
      <div className="title flex flex-col gap-3 ">
        <h3 className="text-base font-bold text-lightGreen">
          Leave A Comment :
        </h3>
        <h5 className="text-sm font-bold">Your Comment</h5>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3">
          <TextField
            label="Message"
            fullWidth
            type="textArea"
            defaultValue="Your Comment"
            {...register("message")}
            multiline
            rows={3}
            maxRows={4}
          />
          <Typography
            variant="small"
            className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
          >
            {errors.message && <InfoIcon fontSize="small" />}
            {errors.message?.message}
          </Typography>
        </div>
        <button disabled={true} className="btn-primary w-full">
          Submit the comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
