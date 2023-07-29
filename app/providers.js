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
        hover: "#00c1a2",
        selected: "#00c1a2",
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
