"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";
import InfoIcon from "@mui/icons-material/Info";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";
import {
  Container,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
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
  })
  .required();

const LoginForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    console.log(data.email, data.password);
    try {
      await login(data.email, data.password);
      router.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid lg:grid-cols-5 h-max drop-shadow-2xl max-w-4xl">
      <div className="lg:col-span-3 flex flex-col justify-center gap-2 text-center bg-white p-6 sm:p-12 md:p-16 lg:rounded-l rounded-t lg:rounded-tr-none">
        <p className="text-center text-gray-900 p-4 header-2">
          Login to Your Account
        </p>
        <div className="flex flex-col gap-2">
          <p className="">Login using Google</p>
          <button className="p-1">
            <GoogleIcon />
          </button>
        </div>
        <div className="grid grid-cols-11 mt-4 -mb-6">
          <div className="border-b border-gray-400 h-3/6 col-span-5"></div>

          <p className=" px-2 col-span-1 text-xs">OR</p>
          <div className="border-b border-gray-400 h-3/6 col-span-5"></div>
        </div>
        <div className="">
          <Container maxWidth="xs">
            <ThemeProvider theme={theme}>
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
                    type="password"
                    defaultValue="test"
                    {...register("password")}
                    variant="standard"
                  />
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
                  >
                    {errors.password && <InfoIcon fontSize="small" />}
                    {errors.password?.message}
                  </Typography>
                </div>

                <button
                  className="btn-primary w-3/6 self-center mb-4"
                  type="submit"
                  variant="filled"
                  fullWidth
                >
                  Login
                </button>
              </form>
            </ThemeProvider>
          </Container>
        </div>
      </div>
      <div className="lg:col-span-2 bg-gradient-to-br from-lightGreen to-teal-700 flex flex-col justify-center items-center lg:rounded-r rounded-b lg:rounded-bl-none p-6 text-center gap-6 ">
        <p className="text:2xl text-3xl font-bold text-white">New Here ?</p>
        <p className="text-white text-sm px-4">
          Sign up and discover great opportunities for both helping others and
          creating your own cause!
        </p>
        <Link href="/signup">
          <button className="rounded bg-white color-black py-2 px-12 self-center font-bold">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
