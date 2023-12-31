"use client";
import {
  Alert,
  Dialog,
  IconButton,
  TextField,
  MenuItem,
  Select,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import defaultDayjs from "dayjs";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";
import localizedFormatPlugin from "dayjs/plugin/localizedFormat";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import InfoIcon from "@mui/icons-material/Info";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FileUpload } from "@mui/icons-material";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";

import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import SmallLoaderStyle from "../helper/SmallLoderStyle";
//Fixes Date Picker Errors//
defaultDayjs.extend(customParseFormatPlugin);
defaultDayjs.extend(localizedFormatPlugin);
defaultDayjs.extend(isBetweenPlugin);
defaultDayjs.extend(utc);
const today = dayjs();

const ProjectForm = ({ openProjectForm, setOpenProjectForm, authUser }) => {
  const [success, setSuccess] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [usersInfo, setUsersInfo] = useState(null);
  const t = useTranslations("ProjectsForm");
  const schema = yup
    .object({
      projectName: yup.string().required(`${t("Project Name is Required")}`),
      goal: yup
        .number()
        .typeError(`${t("Goal Amount Must Be a Number")}`)
        .required(`${t("Goal is Required")}`),
      startingDate: yup.string().required(`${t("Starting Date is Required")}`),
      endingDate: yup.string().required(`${t("Ending Date is Required")}`),
      about: yup.string().required(`${t("About is Required")}`),
      category: yup.string().required(`${t("Project Category is Required")}`),
      media: yup.mixed().required(`${t("Project Picture is Required")}`),
    })
    .required();

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let usersArr = [];
      QuerySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id });
      });
      setUsersInfo(usersArr);
    });
    return () => unsubscribe();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startingDate: "",
      endingDate: "",
      media: null,
      category: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoadingUpload(true);
    try {
      const user = await findUserById(authUser.uid, usersInfo);
      const imgUrl = await uploadFileAndGetDownloadUrl(
        data.media[0].name,
        data.media[0]
      );
      await addProjectToFirestore(data, user, imgUrl);
      setSuccess(true);
      setLoadingUpload(false);
      toast.success(`${t("success-msg")}`);
      reset();
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoadingUpload(false);
    }
  };

  const findUserById = (userId, usersInfo) => {
    return new Promise((resolve, reject) => {
      const userCurrent = usersInfo.find((user) => user.id === userId);
      if (userCurrent) {
        resolve(userCurrent);
      } else {
        reject(
          new Error(
            `${t("user-ıd-part-one")} ${userId} ${t("user-ıd-part-two")}`
          )
        );
      }
    });
  };

  const uploadFileAndGetDownloadUrl = async (fileName, fileData) => {
    const storage = getStorage();
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, fileData);
    const imgUrl = await getDownloadURL(storageRef);
    return imgUrl;
  };

  const addProjectToFirestore = async (data, userCurrent, imgUrl) => {
    const projectData = {
      startingDate: data.startingDate,
      endingDate: data.endingDate,
      url: imgUrl,
      category: data.category,
      name: data.projectName,
      raised: 0,
      about: data.about,
      goal: data.goal,
      contributors: [],
      viewCount: 0,
      creator: {
        userName: userCurrent.name,
        userId: userCurrent.id,
        userImg: userCurrent.userImg,
      },
    };

    await addDoc(collection(db, "projects"), projectData);
    setOpenProjectForm(false);
  };

  const handleClose = () => {
    setOpenProjectForm(false);
  };

  return (
    <LocalizationProvider
      dateLibInstance={defaultDayjs}
      dateAdapter={AdapterDayjs}
    >
      <Dialog open={openProjectForm} size={"lg"} className="">
        <div className="p-6 lg:py-10">
          <div className="flex items-center justify-start gap-2">
            <IconButton onClick={handleClose} aria-label="back">
              <ArrowBackIosNewIcon />
            </IconButton>
            <h1 className="header-2 mt-3 mb-10">{t("kick-off")}</h1>
          </div>

          {success && <Alert severity="success">{t("alert-success")} </Alert>}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="grid lg:grid-cols-2 pb-6 mb-6 border-b border-black">
              <div className="grid lg:border-r lg:border-black lg:pr-6 mb-6 lg:mb-0 ">
                <TextField
                  id="projectName"
                  name="projectName"
                  label={t("name-pro")}
                  variant="standard"
                  {...register("projectName")}
                />
                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                >
                  {errors.projectName && <InfoIcon fontSize="small" />}
                  {errors.projectName?.message}
                </Typography>

                <TextField
                  id="goal"
                  name="goal"
                  label={t("goal-pro")}
                  variant="standard"
                  {...register("goal")}
                />

                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                >
                  {errors.goal && <InfoIcon fontSize="small" />}
                  {errors.goal?.message}
                </Typography>

                <div className="grid lg:grid-cols-2 gap-2 mt-4">
                  <Controller
                    control={control}
                    name="startingDate"
                    render={({ field: { onChange } }) => (
                      <DatePicker
                        disablePast
                        defaultValue={today}
                        onChange={(newValue) => {
                          onChange(newValue?.utc(true) || null);
                        }}
                        label={t("date-pro")}
                        timezone="system"
                        format="DD/MM/YYYY"
                        closeOnSelect={true}
                      />
                    )}
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4 lg:order-1"
                  >
                    {errors.startingDate && <InfoIcon fontSize="small" />}
                    {errors.startingDate?.message}
                  </Typography>

                  <Controller
                    control={control}
                    name="endingDate"
                    render={({ field: { onChange } }) => (
                      <DatePicker
                        disablePast
                        defaultValue={today}
                        onChange={(newValue) => {
                          onChange(newValue?.utc(true) || null);
                        }}
                        label={t("date-two-pro")}
                        timezone="system"
                        format="DD/MM/YYYY"
                        closeOnSelect={true}
                      />
                    )}
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4 lg:order-2"
                  >
                    {errors.endingDate && <InfoIcon fontSize="small" />}
                    {errors.endingDate?.message}
                  </Typography>
                </div>
              </div>
              <div className="grid lg:pl-6  gap-2">
                <TextField
                  id="about"
                  name="about"
                  label={t("about-pro")}
                  variant="standard"
                  {...register("about")}
                />
                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                >
                  {errors.about && <InfoIcon fontSize="small" />}
                  {errors.about?.message}
                </Typography>
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t("category")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category"
                        onChange={onChange}
                        defaultValue=""
                      >
                        <MenuItem value="animals">
                          {t("category-animals")}
                        </MenuItem>
                        <MenuItem value="education">
                          {t("category-education")}
                        </MenuItem>
                        <MenuItem value="culture">
                          {t("category-culture")}
                        </MenuItem>
                        <MenuItem value="children">
                          {t("category-children")}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />

                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                >
                  {errors.category && <InfoIcon fontSize="small" />}
                  {errors.category?.message}
                </Typography>

                <div>
                  <TextField
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <FileUpload />
                        </InputAdornment>
                      ),
                    }}
                    accept="image/*"
                    id="media"
                    name="media"
                    type="file"
                    {...register("media")}
                    sx={{ input: { cursor: "pointer" } }}
                  />

                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.media && <InfoIcon fontSize="small" />}
                    {errors.media?.message}
                  </Typography>
                </div>
              </div>
            </div>
            <button
              className="btn-primary h-[40px] flex flex-row items-center justify-center"
              type="submit"
            >
              {t("upload-project")}
              {loadingUpload && (
                <div
                  style={{
                    zoom: 0.2,
                  }}
                >
                  <SmallLoaderStyle />
                </div>
              )}
            </button>
          </form>
        </div>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ProjectForm;
