"use client";
import LoginForm from "@/components/forms/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next-intl/client";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
const Login = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user !== null) {
      router.push("/profile");
    }
  }, []);

  return (
    <div className="relative flex justify-center items-center bg-gradient-to-t from-transparent   to-teal-50 lg:h-[100vh]  p-4   py-20  bg-no-repeat overflow-hidden bg-cover">
      <Fade>
        <div style={circleBackgroundStyle}></div>
        <LoginForm />
        <div style={circleBackgroundStyle2}></div>
      </Fade>
    </div>
  );
};

export default Login;
const circleBackgroundStyle = {
  position: "absolute",
  top: "-50px",
  right: "50px",
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  background: "#00c1a1a5",
  transform: "rotate(45deg)",
  zIndex: -1,

  animation: `moveCircle2 10s linear infinite`,
};

const circleBackgroundStyle2 = {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "500px",
  height: "500px",
  borderRadius: "50%",
  background: "#00c1a144",
  zIndex: -1,
  filter: "blur(20px)",
  transform: "rotate(45deg)",
  animation: `moveCircle2  10s linear infinite`,
};
