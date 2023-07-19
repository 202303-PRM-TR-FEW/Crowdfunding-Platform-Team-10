"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Typography, Input } from "@material-tailwind/react";
import InfoIcon from "@mui/icons-material/Info";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { Container } from "@mui/material";
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
    <div className="grid lg:grid-cols-5 h-max gap-2 shadow-2xl max-w-4xl">
      <div className="lg:col-span-3 flex flex-col justify-center gap-2 text-center bg-white p-16">
        <p className="text-center text-gray-900 p-4 header-2">
          Login to Your Account
        </p>
        <div className="flex flex-col gap-2">
          <p className="">Login using Google</p>
          <button className="p-1">
            <GoogleIcon />
          </button>
          <p className=" px-2">OR</p>
        </div>
        <div className="">
          <Container maxWidth="xs">
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mt-6">
                <Input
                  label="Email"
                  fullWidth
                  variant="standard"
                  {...register("email")}
                  color="blue-gray"
                  type="email"
                  className=" border-gray-900 "
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
                <Input
                  label="Password"
                  type="password"
                  variant="standard"
                  fullWidth
                  {...register("password")}
                  color="blue-gray"
                  className=" border-gray-900 "
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
          </Container>
        </div>
      </div>
      <div className="lg:col-span-2 bg-gradient-to-br from-lightGreen to-teal-700 flex flex-col justify-center items-center p-6 text-center gap-6 ">
        <p className="text:2xl md:text-4xl font-bold text-white">New Here ?</p>
        <p className="text-white text-sm px-4">
          Sign up and discover great opportunities for both helping others and
          funding your own cause!
        </p>
        <Link href="/signup">
          <button className="rounded bg-white color-black py-2 px-12 self-center font-bold">
            Sign Up
          </button>
        </Link>
      </div>
      {/* <div className="lg:grid-1 ">
        <Card className="w-full bg-transparent  shadow-none">
          <Typography
            variant="h3"
            className="text-center text-gray-900 border-y-4 py-2 border-gray-900"
          >
            Log In
          </Typography>

          <CardBody className="flex flex-col gap-4 w-full p-0">
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mt-6">
                <Input
                  label="Email"
                  fullWidth
                  variant="standard"
                  {...register("email")}
                  color="blue-gray"
                  type="email"
                  className=" border-gray-900 "
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
                <Input
                  label="Password"
                  type="password"
                  variant="standard"
                  fullWidth
                  {...register("password")}
                  color="blue-gray"
                  className=" border-gray-900 "
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
                className="mt-8 bg-gray-900 py-3 px-1 w-full text-white"
                type="submit"
                variant="filled"
                fullWidth
              >
                Log In
              </button>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                <Link href="/signup" className="underline text-gray-800">
                  Sign up
                </Link>
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="lg:grid-1 hidden lg:block">
        <Image
          width={295}
          height={165}
          src={welcomeHand}
          alt="Picture of thanking"
          className="w-full"
        />
      </div> */}
    </div>
  );
};

export default LoginForm;
