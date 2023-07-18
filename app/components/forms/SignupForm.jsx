import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import welcomeHand from "../../../public/assets/images/welcome-hand.png";
import { db } from "@/config/firebase";
import { FileUpload } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import {
  TextField,
  Box,
  Autocomplete,
  Typography,
  InputAdornment,
  ThemeProvider,
  createTheme,
  FormControl,
  Chip,
} from "@mui/material";
import { countries } from "@/data/countries";
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
      projects: [],
      donations: [],
      country: "",
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const { user, signup } = useAuth();
  const [err, setErr] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    userImg: "",
    projects: [],
    donations: [],
  });

  const onSubmit = async (data) => {
    const storage = getStorage();
    const storageRef = ref(storage, data.userImg[0].name);
    console.log(data);
    // uploadBytes(storageRef, data.userImg[0]).then(async (snapshot) => {
    //   console.log(storageRef);
    //   getDownloadURL(ref(storage, data.userImg[0].name)).then(
    //     async (imgUrl) => {
    //       setErr("");

    //       try {
    //         const res = await signup(data.email, data.password);
    //         await setDoc(doc(db, "users", res.user.uid), {
    //           // ...userData,
    //           name: data.name,
    //           bio: data.bio,
    //           userImg: imgUrl,
    //           projects: data.projects,
    //           donations: data.donations,
    //           email: data.email,
    //           timeStamp: serverTimestamp(),
    //         });

    //         router.push("/profile");
    //       } catch (e) {
    //         setErr(e.message);
    //       }
    //     }
    //   );
    // });
  };

  return (
    <div className="lg:grid lg:grid-cols-2 items-center justify-between lg:gap-20 lg:px-40 lg:py-24 py-10 px-5 lg:flex-row flex-col">
      <ThemeProvider theme={theme}>
        <div className="lg:grid-1 ">
          <div className="w-full bg-transparent  shadow-none">
            <Typography
              variant="h3"
              className="text-center text-gray-900 border-y-4 py-2 border-lightGreen"
            >
              Create New Account
            </Typography>

            <div className="flex flex-col gap-4 w-full p-0">
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mt-6">
                  <TextField
                    label="Email"
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
                    label="Password"
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
                    label="Full Name"
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
                    label="Bio"
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
                    control={control}
                    name="country"
                    render={({ field: { onChange } }) => (
                      <Autocomplete
                        id="country-select-demo"
                        options={countries}
                        autoHighlight
                        onInputChange={(event, newInputValue) => {
                          onChange(newInputValue);
                        }}
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                            key={option}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              alt=""
                            />
                            {option.label}
                          </Box>
                        )}
                        renderTags={(tagValue, getTagProps) => {
                          return tagValue.map((option, index) => (
                            <Chip
                              {...getTagProps({ index })}
                              key={option}
                              label={option}
                            />
                          ));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password", // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
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
                    label="User Picture"
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
                  className="mt-8 btn-primary w-full "
                  type="submit"
                  variant="filled"
                  fullWidth
                >
                  Sign Up
                </button>
              </form>
              <p>{err}</p>
            </div>
          </div>
        </div>
        <div className="lg:grid-1 hidden lg:block">
          <Image
            width={295}
            height={165}
            src={welcomeHand}
            alt="Picture of thanking"
            className="w-full"
          />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default SignupForm;
