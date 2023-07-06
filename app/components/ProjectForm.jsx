"use client";
import { IconButton } from "@mui/material";
import { Button, Dialog, Input } from "@material-tailwind/react";
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

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FileUpload } from "@mui/icons-material";

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
    goal: yup.string().required("Goal is Required !"),
    startingDate: yup.string().required("Starting Date is Required !"),
    endingDate: yup.string().required("Ending Date is Required !"),
    about: yup.string().required("About is Required !"),
    media: yup.string().required("Project Picture is Required !"),
  })
  .required();

const ProjectForm = ({ openProjectForm, setOpenProjectForm }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startingDate: "",
      endingDate: "",
      media: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const projectData = `
    Name: ${data.projectName}
    goal: ${data.goal}
    start: ${data.startingDate}
    end: ${data.endingDate}
    about: ${data.about}
    media: ${data.media[0]}
    `;
    alert(projectData);
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
                <p className="text-red-800 mb-4 mt-2">
                  {errors.projectName?.message}
                </p>

                <Input
                  id="goal"
                  name="goal"
                  label="Add your goal"
                  variant="standard"
                  {...register("goal")}
                />
                <p className="text-red-800 mb-4 mt-2">{errors.goal?.message}</p>

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
                  <p className="text-red-800 mb-4 mt-2 lg:order-1">
                    {errors.startingDate?.message}
                  </p>

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
                  <p className="text-red-800 mb-4 mt-2 order-2">
                    {errors.endingDate?.message}
                  </p>
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
                  <p className="text-red-800 mt-2 mb-3">
                    {errors.about?.message}
                  </p>
                </div>
                <div>
                  <Input
                    icon={<FileUpload />}
                    accept="image/*"
                    id="media"
                    name="media"
                    type="file"
                    label="Project Picture"
                    {...register("media")}
                  />
                  <p className="text-red-800 mb-4 mt-2">
                    {errors.media?.message}
                  </p>
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
