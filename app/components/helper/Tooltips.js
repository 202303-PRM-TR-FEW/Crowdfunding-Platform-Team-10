import * as React from "react";
import { createTheme, styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const theme = createTheme({
  palette: {
    dark: {
      main: "#20272c",
    },
    light: {
      main: "#fff",
    },
  },
});

const CustomizedTooltip = ({
  children,
  title,
  placement = "top-start",
  mode = "light",
}) => {
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor:
        mode === "light" ? theme.palette.common.white : "#20272c",
      color: mode === "light" ? "#20272c" : theme.palette.common.white,
      fontSize: 12,
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: mode === "light" ? theme.palette.common.white : "#20272c",
    },
  }));

  return (
    <BootstrapTooltip title={title} placement={placement} arrow>
      {children}
    </BootstrapTooltip>
  );
};

export default CustomizedTooltip;
