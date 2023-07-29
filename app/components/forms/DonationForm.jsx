"use client";
import { Alert, Checkbox, IconButton, Input } from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InfoIcon from "@mui/icons-material/Info";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { db } from "@/config/firebase";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";

////// These need to be where the new project form button is //////
// const [openDonationForm, setOpenDonationForm] = useState(false);
// const handleDonationForm = () => {
//   openDonationForm === false ? setOpenDonationForm(true) : setOpenDonationForm(false);
// };
// <DonationForm openDonationForm={openDonationForm} setOpenDonationForm={setOpenDonationForm} />
const schema = yup
  .object({
    donation: yup
      .number()
      .min(1, "Donation Amount Can't Be Lower Than 1 Dollar !")
      .typeError("Donation Amount Must Be a Number !")
      .required("Donation Amount is Required !"),
  })
  .required();

const DonationForm = ({ openDonationForm, setOpenDonationForm, id, title }) => {
  const { user, currentUser } = useAuth();

  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      donation: "",
      charity: false,
      userId: user ? user.uid : "",
      projectId: id.id,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await addDoc(collection(db, "donations"), {
        donaiton: data.donation,
        userId: data.userId,
        projectId: data.projectId,
        userImg: currentUser.userImg,
        userName: currentUser.name,
        projectName: title,
        timeStamp: serverTimestamp(),
      });
      await updateDoc(doc(db, "projects", id.id), {
        raised: increment(data.donation),
      });
      console.log("donated");
      setSuccess(true);
      reset();
      // router.push("/thanks");
    } catch (error) {
      console.log("notdonated", error);
    }
  };

  const handleClose = () => {
    setOpenDonationForm(false);
  };

  return (
    <div>
      <Dialog open={openDonationForm}>
        <div className="p-6 h-full relative">
          <IconButton onClick={handleClose} aria-label="back">
            <ArrowBackIosNewIcon />
          </IconButton>
          <h1 className="header-2 mt-3">Enter the donation amount:</h1>
          <form
            id="donation"
            onSubmit={handleSubmit(onSubmit)}
            className="grid"
          >
            <Input
              id="donation"
              name="donation"
              placeholder="$1"
              variant="standard"
              {...register("donation")}
            />
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
            >
              {errors.donation && <InfoIcon fontSize="small" />}
              {errors.donation?.message}
            </Typography>
            <div className="flex items-center">
              <label htmlFor="charity">Add 2% for charity ?</label>
              <Controller
                name="charity"
                control={control}
                render={({ field: props }) => (
                  <Checkbox
                    {...props}
                    checked={props.value}
                    onChange={(e) => props.onChange(e.target.checked)}
                  />
                )}
              />
            </div>
            {success && (
              <Alert severity="success">Donation Succesfull ! </Alert>
            )}
            <button form="donation" type="submit" className="btn-primary mt-24">
              Pay Now
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default DonationForm;
