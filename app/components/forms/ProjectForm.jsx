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
  createTheme,
  ThemeProvider,
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
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FileUpload } from "@mui/icons-material";
import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "@/config/firebase";
import { FundContext } from "@/context/FundContext";
import LoaderStyle from "../helper/LoaderStyle";
//Fixes Date Picker Errors//
defaultDayjs.extend(customParseFormatPlugin);
defaultDayjs.extend(localizedFormatPlugin);
defaultDayjs.extend(isBetweenPlugin);
defaultDayjs.extend(utc);
const today = dayjs();
//Fixes Date Picker Errors//

////// These need to be where the new project form button is //////
// const [openProjectForm, setOpenProjectForm] = useState(false);
// const handleNewProject = () => {
//   openProjectForm === false ? setOpenProjectForm(true) : setOpenProjectForm(false);
// };
// <ProjectForm openProjectForm={openProjectForm} setOpenProjectForm={setOpenProjectForm} />

const schema = yup
  .object({
    projectName: yup.string().required("Project Name is Required !"),
    goal: yup
      .number()
      .typeError("Goal Amount Must Be a Number !")
      .required("Goal is Required !"),
    startingDate: yup.string().required("Starting Date is Required !"),
    endingDate: yup.string().required("Ending Date is Required !"),
    about: yup.string().required("About is Required !"),
    category: yup.string().required("Project Category is Required !"),
    media: yup.mixed().required("Project Picture is Required !"),
  })
  .required();
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
const ProjectForm = ({ openProjectForm, setOpenProjectForm, authUser }) => {
  const [success, setSuccess] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { usersInfo } = useContext(FundContext); //get our data from our main context

  const {
    register,
    handleSubmit,
    control,
    setValue,
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
        reject(new Error(`User with ID ${userId} not found.`));
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
      creator: {
        userName: userCurrent.name,
        userId: userCurrent.id,
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
      <ThemeProvider theme={theme}>
        <Dialog open={openProjectForm} size={"lg"} className="">
          <div className="p-6">
            <IconButton onClick={handleClose} aria-label="back">
              <ArrowBackIosNewIcon />
            </IconButton>
            <h1 className="header-1 mt-3 mb-6">
              Kick-off <br /> your project
            </h1>
            {success && (
              <Alert severity="success">Created Project Succesfully ! </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="grid lg:grid-cols-2 pb-6 mb-6 border-b border-black">
                <div className="grid lg:border-r lg:border-black lg:pr-6 mb-6 lg:mb-0 ">
                  <TextField
                    id="projectName"
                    name="projectName"
                    label="Name of your project"
                    variant="standard"
                    {...register("projectName")}
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.projectName && (
                      <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    )}
                    {errors.projectName?.message}
                  </Typography>

                  <TextField
                    id="goal"
                    name="goal"
                    label="Add your goal"
                    variant="standard"
                    {...register("goal")}
                  />

                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.goal && (
                      <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    )}
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
                          label="Starting Date"
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
                      {errors.startingDate && (
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                      )}
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
                          label="Ending Date"
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
                      {errors.endingDate && (
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                      )}
                      {errors.endingDate?.message}
                    </Typography>
                  </div>
                </div>
                <div className="grid lg:pl-6  gap-2">
                  <TextField
                    id="about"
                    name="about"
                    label="About your project"
                    variant="standard"
                    {...register("about")}
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.about && (
                      <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    )}
                    {errors.about?.message}
                  </Typography>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Category"
                          onChange={onChange}
                          defaultValue=""
                        >
                          <MenuItem value="animals">Animals</MenuItem>
                          <MenuItem value="education">Education</MenuItem>
                          <MenuItem value="culture">Culture</MenuItem>
                          <MenuItem value="children">Children</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />

                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.category && (
                      <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    )}
                    {errors.category?.message}
                  </Typography>

                  <div>
                    <TextField
                      className="cursor-pointer"
                      // icon={<FileUpload />}
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
                      // label="Project Picture"
                      {...register("media")}
                    />
                    <Typography
                      variant="small"
                      className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                    >
                      {errors.media && (
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                      )}
                      {errors.media?.message}
                    </Typography>
                  </div>
                </div>
              </div>
              <button
                className="btn-primary flex flex-row items-center justify-center"
                type="submit"
              >
                Upload Project
                {loadingUpload && (
                  <div
                    style={{
                      zoom: 0.2,
                    }}
                  >
                    <LoaderStyle />
                  </div>
                )}
              </button>
            </form>
          </div>
        </Dialog>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default ProjectForm;
