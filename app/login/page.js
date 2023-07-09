"use client";

import LoginForm from "@/components/forms/LoginForm";

// import { useRouter } from "next/navigation";
// import { useAuth } from "../context/AuthContext";
// import Link from "next/link";
// import {
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
//   Button,
//   Card,
// } from "@material-tailwind/react";
// import { InformationCircleIcon } from "@heroicons/react/24/solid";

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// const schema = yup
//   .object({
//     email: yup
//       .string()
//       .required("Email is Required !")
//       .email("Use a Valid Email"),
//     password: yup.string().required("Password is Required !"),
//   })
//   .required();

const Login = () => {
  // const {
  //   register,
  //   handleSubmit,

  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  //   resolver: yupResolver(schema),
  // });

  // const router = useRouter();
  // const { user, login } = useAuth();

  // const onSubmit = async (data) => {
  //   console.log(data.email, data.password);
  //   try {
  //     await login(data.email, data.password);
  //     router.push("/profile");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default Login;
