"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { AuthContextProvider } from "@/context/AuthContext";

function Providers({ children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00c1a2",
      },
      action: {
        // Customize the autofill background color
        hover: "#00c1a2", // Replace with your desired color
        selected: "#00c1a2", // Replace with your desired color
      },
    },
  });

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <div>{children}</div>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default Providers;
