import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  setDoc,
  doc,
  collection,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import {
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Card,
} from "@material-tailwind/react";
import { FileUpload } from "@mui/icons-material";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is Required !")
      .email("Use a Valid Email"),
    password: yup.string().required("Password is Required !"),
    name: yup.string().required("Full Name is Required !"),
    bio: yup.string().required("Bio is Required !"),
  })
  .required();

import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      bio: "",
      userImg: "",
      projects: [],
      donations: [],
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
    <div>
      <Card className="max-w-max mt-24">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-24 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
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
            <div>
              <Input label="Full Name" size="lg" {...register("name")} />
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
              >
                {errors.name && (
                  <InformationCircleIcon className="w-4 h-4 -mt-px" />
                )}
                {errors.name?.message}
              </Typography>
            </div>
            <div>
              <Input label="Bio" size="lg" {...register("bio")} />
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
              >
                {errors.bio && (
                  <InformationCircleIcon className="w-4 h-4 -mt-px" />
                )}
                {errors.bio?.message}
              </Typography>
            </div>
            <div>
              <Input
                className="cursor-pointer"
                icon={<FileUpload />}
                accept="image/*"
                id="userImg"
                name="userImg"
                type="file"
                label="Project Picture"
                {...register("userImg", { required: true })}
              />
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
              >
                {errors.userImg && (
                  <InformationCircleIcon className="w-4 h-4 -mt-px" />
                )}
                {errors.userImg?.message}
              </Typography>
            </div>

            <Button
              className="mt-8 "
              type="submit"
              variant="gradient"
              fullWidth
            >
              Sign Up
            </Button>
          </form>
          <p>{err}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignupForm;
