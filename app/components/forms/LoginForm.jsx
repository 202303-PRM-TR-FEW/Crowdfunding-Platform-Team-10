"use client";

import { useRouter } from "next/navigation";
import welcomeHand from "../../../public/assets/images/welcome-hand.png";

import Link from "next/link";
import {

  CardBody,
  CardFooter,
  Typography,
  Input,
  Card,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
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
  const { user, login } = useAuth();

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
  
    <div className="lg:grid lg:grid-cols-2 items-center justify-between lg:gap-20 lg:px-40 lg:py-24 py-10 px-5 lg:flex-row flex-col">

<div className="lg:grid-1 ">

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
                    {errors.email && (
                      <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    )}
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
                    {errors.password && (
                      <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    )}
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
        </div>
      </div>
    
  );
};

export default LoginForm;
