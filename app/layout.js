import { Suspense } from "react";
import "../app/[locale]/globals.css";
import Loading from "./loading";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://svgur.com/i/w5P.svg" />
      </head>
      <body>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
