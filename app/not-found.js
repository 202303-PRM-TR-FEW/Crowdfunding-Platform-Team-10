import NotFoundComponent from "./components/helper/NotFoundComponent";
import { redirect } from "next/navigation";

function NotFound() {
  const redirectState = true;
  if (redirectState) redirect("/missing-page");
  return (
    <>
      <NotFoundComponent />
    </>
  );
}

export default NotFound;
