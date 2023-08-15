"use client";

import { useRouter } from "next-intl/client";
import Link from "next-intl/link";

import InfoIcon from "@mui/icons-material/Info";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { Container, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

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
  const { login, googleLogIn } = useAuth();

  const handleGoogleLogIn = async () => {
    try {
      await googleLogIn();
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      router.push("/profile");
    } catch (err) {
      console.log(err);

      // Check if the error is due to user not found
      if (err.code === "auth/user-not-found") {
        toast.error(
          "Invalid email or password. Please check your login credentials.",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      } else {
        // For other errors, show a generic error message
        toast.error(err.code, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  
  const t = useTranslations("LoginForm");
  return (
    <div className="grid lg:grid-cols-5 h-max drop-shadow-2xl lg:mt-16 max-w-4xl md:pt-10 ">
      <div className="lg:col-span-3 flex flex-col justify-center gap-2 text-center bg-[#fffb] p-6 sm:p-12 md:p-16 lg:rounded-l rounded-t lg:rounded-tr-none">
        <p className="text-center text-gray-900 p-4 header-2">{t("header")}</p>
        <div className="flex flex-col gap-2">
          <p className="">{t("subHeader")}</p>
          <div className="flex justify-center p-1">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition duration-200 shadow-md"
              onClick={handleGoogleLogIn}
            >
              <img
                unoptimized
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google"
                width={25}
                height={25}
              />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-11 mt-4 -mb-6">
          <div className="border-b border-gray-400 h-3/6 col-span-5"></div>

          <p className=" px-2 col-span-1 text-xs">{t("or")}</p>
          <div className="border-b border-gray-400 h-3/6 col-span-5"></div>
        </div>
        <div className="">
          <Container maxWidth="xs">
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mt-6">
                <TextField
                  label={t("emailInput")}
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
                  label={t("passwordInput")}
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
                className="btn-primary w-3/6 self-center mb-4 mt-4"
                type="submit"
                variant="filled"
                fullWidth
              >
                {t("loginButton")}
              </button>
            </form>
          </Container>
        </div>
      </div>
      <div className="lg:col-span-2  overflow-hidden bg-gradient-to-br from-lightGreen to-teal-700 flex flex-col  justify-center items-center lg:rounded-r rounded-b lg:rounded-bl-none p-6 text-center gap-6 ">
        <p className="text:2xl text-3xl font-bold text-white z-10">
          {t("sideHeader")}
        </p>
        <p className="text-white text-sm px-4 z-10">{t("sideParagraph")}</p>
        <Link href="/signup" className="z-10">
          <button className="btn-white w-[140px] z-10 py-2 px-12 self-center font-bold  ">
            {t("signupButton")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
