"use client";
import {
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Input,
  ThemeProvider,
  createTheme,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
const DonationForm = ({ openDonationForm, setOpenDonationForm }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      donation: "",
      charity: false,
      userId: "userId",
      projectId: "projectId",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const donationData = `
        donation: ${data.donation}
        charity: ${data.charity}
        userId: ${data.userId}
        projectId: ${data.projectId}
        `;
    alert(donationData);
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
    setOpenDonationForm(false);
  };
  const FontTheme = createTheme({
    typography: {
      fontSize: 60,
    },
  });
  return (
    <div>
      <Modal
        open={openDonationForm}
        // onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <div>
            <IconButton onClick={handleClose} color="primary" aria-label="back">
              <ArrowBackIosNewIcon />
            </IconButton>
            <h1 className="lg:text-[40px] md:text-[30px] text-[20px] font-bold mt-3 mb-24">
              Enter the donation <br />
              amount:
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
              <ThemeProvider theme={FontTheme}>
                <Input
                  id="donation"
                  name="donation"
                  variant="standard"
                  placeholder="1"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  {...register("donation")}
                />
              </ThemeProvider>
              <p className="text-red-800 mb-4 mt-2">
                {errors.donation?.message}
              </p>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Controller
                      name="charity"
                      control={control}
                      render={({ field: props }) => (
                        <Checkbox
                          sx={{ color: "rgb(156, 163, 175)" }}
                          {...props}
                          checked={props.value}
                          onChange={(e) => props.onChange(e.target.checked)}
                        />
                      )}
                    />
                  }
                  label="Add 2% for charity ?"
                  labelPlacement="start"
                />
              </FormGroup>
              <Button variant="contained" type="submit">
                Pay Now
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DonationForm;
