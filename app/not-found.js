import NotFoundComponent from "./components/helper/NotFoundComponent";
import { redirect } from "next/navigation";

function NotFound() {
  redirect("/missing-page");
  return (
    <>
      <NotFoundComponent />
    </>
  );
}

export default NotFound;
