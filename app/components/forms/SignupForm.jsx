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
import {
  TextField,
  Typography,
  InputAdornment,
  ThemeProvider,
  createTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import { countries } from "@/data/countries";
import Link from "next/link";
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
    uploadBytes(storageRef, data.userImg[0]).then(async (snapshot) => {
      console.log(storageRef);
      getDownloadURL(ref(storage, data.userImg[0].name)).then(
        async (imgUrl) => {
          setErr("");

          try {
            const res = await signup(data.email, data.password);
            await setDoc(doc(db, "users", res.user.uid), {
              // ...userData,
              name: data.name,
              bio: data.bio,
              userImg: imgUrl,
              projects: data.projects,
              donations: data.donations,
              email: data.email,
              timeStamp: serverTimestamp(),
              country: data.country,
            });

            router.push("/profile");
          } catch (e) {
            setErr(e.message);
          }
        }
      );
    });
  };

  return (
    <div className="grid lg:grid-cols-5 h-max gap-2 shadow-2xl max-w-4xl">
      <div className="lg:col-span-2 bg-gradient-to-tl from-lightGreen to-teal-700 flex flex-col justify-center items-center p-6 text-center gap-6 ">
        <p className=" px-10 lg:px-0 md:text-4xl font-bold text-white">
          Already Have an Account ?
        </p>

        <Link href="/login">
          <button className="rounded bg-white color-black py-2 px-12 self-center font-bold">
            Log In
          </button>
        </Link>
      </div>
      <div className="lg:col-span-3 grid gap-2 text-center h-full bg-white">
        <ThemeProvider theme={theme}>
          <div className="grid gap-4 w-full  py-10">
            <Container maxWidth="xs">
              <div className="grid justify-center items-center h-full">
                <p className="text-center text-gray-900 pt-10 pb-0 header-2">
                  Create Your Account
                </p>
                <form
                  className="flex flex-col gap-4"
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
                      name="country"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <FormControl variant="standard" fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Country
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
                                      <img
                                        className="rounded-none "
                                        loading="lazy"
                                        width="20"
                                        height="10"
                                        src={`https:flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                        srcSet={`https:flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                      />{" "}
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
                    className="mt-8 btn-primary w-4/6 self-center "
                    type="submit"
                    variant="filled"
                    fullWidth
                  >
                    Sign Up
                  </button>
                </form>
                <p>{err}</p>
              </div>
            </Container>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default SignupForm;
