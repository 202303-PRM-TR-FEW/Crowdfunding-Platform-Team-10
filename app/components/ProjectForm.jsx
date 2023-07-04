"use client";
import { Button, IconButton, Modal, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import defaultDayjs from "dayjs";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";
import localizedFormatPlugin from "dayjs/plugin/localizedFormat";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";

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
  const style = {
    borderRadius: "15px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "min-content",
    maxWidth: "800px",
    minHeight: "min-content",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleClose = () => {
    setOpenProjectForm(false);
  };

  return (
    <LocalizationProvider
      dateLibInstance={defaultDayjs}
      dateAdapter={AdapterDayjs}
    >
      <Modal
        open={openProjectForm}
        // onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <div>
            <IconButton onClick={handleClose} color="primary" aria-label="back">
              <ArrowBackIosNewIcon />
            </IconButton>
            <h1 className="lg:text-[60px] md:text-[40px] text-[20px] font-bold mt-3 mb-6">
              Kick-off <br /> your project
            </h1>
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
                  <p className="text-red-800 mb-4 mt-2">
                    {errors.projectName?.message}
                  </p>

                  <TextField
                    id="goal"
                    name="goal"
                    label="Add your goal"
                    variant="standard"
                    {...register("goal")}
                  />
                  <p className="text-red-800 mb-4 mt-2">
                    {errors.goal?.message}
                  </p>
                  <div className="flex gap-2 md:flex-nowrap flex-wrap">
                    <div>
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
                          />
                        )}
                      />
                      <p className="text-red-800 mb-4 mt-2">
                        {errors.startingDate?.message}
                      </p>
                    </div>
                    <div>
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
                          />
                        )}
                      />
                      <p className="text-red-800 mb-4 mt-2">
                        {errors.endingDate?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid lg:pl-6 ">
                  <TextField
                    id="about"
                    name="about"
                    label="About your project"
                    variant="standard"
                    {...register("about")}
                  />
                  <p className="text-red-800 mb-4 ">{errors.about?.message}</p>
                  <div>
                    <input
                      accept="image/*"
                      id="media"
                      name="media"
                      type="file"
                      {...register("media")}
                    />
                    <p className="text-red-800 mb-4 mt-2">
                      {errors.media?.message}
                    </p>
                  </div>
                  <label
                    className="flex flex-col justify-center"
                    htmlFor="media"
                  >
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<FileUploadIcon />}
                    >
                      Add Media
                    </Button>
                  </label>
                </div>
              </div>
              <Button variant="contained" type="submit">
                Upload Project
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default ProjectForm;
