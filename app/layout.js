import "../app/[locale]/globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://svgur.com/i/w5P.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
