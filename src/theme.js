import { createTheme } from "@mui/material";

const dark = "#001219ff";
const lightDark = "#222222";
const primary = "#171b4d";
const secondary = "#11c4c1";
const vanilla = "#e9d8a6ff";
const orange = "#ee9b00ff";
const mediumOrange = "#ca6702ff";
const darkOrange = "#bb3e03ff";
const red = "#d32f2f";
const darkRed = "#9b2226ff";
const lightGray = "#abb2b78a";
// const contrast = "#caf0f8ff";
const contrast = "#e3f6fb";
const darkContrast = "#a8d9e1";

export default createTheme({
  palette: {
    common: {
      dark: dark,
      lightDark: lightDark,
      lightGray: lightGray,
      primary: primary,
      secondary: secondary,
      vanilla: vanilla,
      orange: orange,
      mediumOrange: mediumOrange,
      darkOrange: darkOrange,
      red: red,
      darkRed: darkRed,
      contrast: contrast,
      darkContrast: darkContrast,
    },
    primary: {
      main: primary,
      light: "#003989",
    },
    secondary: {
      main: secondary,
    },
    error: {
      main: red,
      dark: darkRed,
    },
    background: {
      paper: contrast,
      dark: darkContrast,
      default: "#071535",
    },
    text: {
      dark: dark,
      light: contrast,
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
      fontWeight: 500,
      textTransform: "none",
    },
  },
});
