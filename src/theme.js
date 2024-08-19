import { createTheme } from "@mui/material";

export default createTheme({
  palette: {
    primary: {
      main: "#0077b6", // Honolulu Blue
    },
    secondary: {
      main: "#00b4d8", // Pacific Cyan
    },
    background: {
      default: "#FFFFFF", // Background color
      paper: "#FFFFFF",
    },
    text: {
      primary: "#222222", // Font color
      secondary: "#90e0ef", // Non-Photo Blue
    },
    action: {
      active: "#03045e", // Federal Blue
    },
    info: {
      main: "#caf0f8", // Light Cyan
    },
  },
  typography: {
    fontFamily: "Raleway, Arial",
    h1: {
      fontSize: "2.986rem",
      fontWeight: 400,
    },
    h2: {
      fontSize: "2.488rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "2.074rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.728rem",
      fontWeight: 400,
    },
    h5: {
      fontSize: "1.44rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.833rem",
    },
    button: {
      fontWeight: 400,
    },
  },
});
