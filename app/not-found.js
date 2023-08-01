/* eslint-disable @next/next/no-img-element */
"use client";

import { notFound } from "next/navigation";
import NotFoundComponent from "./components/helper/NotFoundComponent";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();
  router.push("/not-found");
  return (
    <>
      <NotFoundComponent />
    </>
  );
}

export default NotFound;
