import NotFoundComponent from "./components/helper/NotFoundComponent";
import { notFound } from "next/navigation";

function NotFound() {
  const redirect = true;
  if (redirect === true) {
    notFound();
  }

  return (
    <>
      <NotFoundComponent />
    </>
  );
}

export default NotFound;
