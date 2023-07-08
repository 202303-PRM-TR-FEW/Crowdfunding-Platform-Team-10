"use client";
import { IconButton } from "@mui/material";
import {
  Button,
  Dialog,
  Input,
  Option,
  Typography,
  Select,
} from "@material-tailwind/react";
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
import { db } from "../config/firebase";
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
  })
  .required();

const ProjectForm = ({ openProjectForm, setOpenProjectForm, user }) => {
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
      media: "",
      category: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const storage = getStorage();
    const storageRef = ref(storage, data.media[0].name);
    uploadBytes(storageRef, data.media[0]).then((snapshot) => {
      console.log(storageRef);
    });

    getDownloadURL(ref(storage, data.media[0].name)).then(async (imgUrl) => {
      await addDoc(collection(db, "projects"), {
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
          userName: user.displayName,
          userId: user.uid,
        },
      });
    });
    console.log(data);
  };

  const handleClose = () => {
    setOpenProjectForm(false);
  };

  return (
    <LocalizationProvider
      dateLibInstance={defaultDayjs}
      dateAdapter={AdapterDayjs}
    >
      <Dialog open={openProjectForm} size={"md"} className="-z-50">
        <div className="p-6 -z-50">
          <IconButton onClick={handleClose} aria-label="back">
            <ArrowBackIosNewIcon />
          </IconButton>
          <h1 className="lg:text-[60px] md:text-[40px] text-[20px] text-black font-bold mt-3 mb-6">
            Kick-off <br /> your project
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="grid lg:grid-cols-2 pb-6 mb-6 border-b border-black">
              <div className="grid lg:border-r lg:border-black lg:pr-6 mb-6 lg:mb-0 ">
                <Input
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

                <Input
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

                <div className="grid lg:grid-cols-2 gap-2">
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
              <div className="grid lg:pl-6 ">
                <div>
                  <Input
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
                </div>
                <div>
                  <Select
                    onChange={(e) => setValue("category", e)}
                    variant="standard"
                    label="Select Category"
                  >
                    <Option value="animals">Animals</Option>
                    <Option value="educaion">Education</Option>
                    <Option value="culture">Culture</Option>
                    <Option value="children">Children</Option>
                  </Select>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.category && (
                      <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    )}
                    {errors.category?.message}
                  </Typography>
                </div>
                <div>
                  <Input
                    className="cursor-pointer"
                    icon={<FileUpload />}
                    accept="image/*"
                    id="media"
                    name="media"
                    type="file"
                    label="Project Picture"
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
            <Button type="submit">Upload Project</Button>
          </form>
        </div>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ProjectForm;
