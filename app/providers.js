"use client";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthContextProvider } from "@/context/AuthContext";
import { NextIntlClientProvider } from "next-intl";
import Loading from "loading";
import { Outfit } from "next/font/google";
import { Suspense } from "react";
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}

function Providers({ children, locale, messages }) {
  const theme = createTheme({
    typography: {
      fontFamily: "Outfit, sans-serif",
    },
    palette: {
      primary: {
        main: "#00c1a2",
      },
      action: {
        hover: "#00c1a2",
        selected: "#00c1a2",
      },
    },
  });

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextIntlClientProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default Providers;
