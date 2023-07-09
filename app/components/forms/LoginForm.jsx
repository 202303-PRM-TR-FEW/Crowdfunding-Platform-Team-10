"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Card,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";
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
    <div className="flex justify-center items-center">
      <Card className="max-w-max mt-24">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-24 place-items-center"
        >
          <Typography variant="h3" color="white">
            Log In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                label="Email"
                size="lg"
                defaultValue="test"
                {...register("email")}
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
              <Input label="Password" size="lg" {...register("password")} />
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

            <Button
              className="mt-8 "
              type="submit"
              variant="gradient"
              fullWidth
            >
              Log In
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
