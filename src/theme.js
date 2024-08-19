import { createTheme } from "@mui/material";

// const darkBlue = "#03045eff";
// const blue = "#023e8aff";
// const mediumblue = "#0077b6ff";
// const lightBlue = "#0096c7ff";
// const darkSky = "#00b4d8ff";
// const sky = "#48cae4ff";
// const mediumSyy = "#90e0efff";
// const lightSky = "#ade8f4ff";

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
const contrast = "#caf0f8ff";

export default createTheme({
  palette: {
    common: {
      dark: dark,
      lightDark: lightDark,
      primary: primary,
      secondary: secondary,
      vanilla: vanilla,
      orange: orange,
      mediumOrange: mediumOrange,
      darkOrange: darkOrange,
      red: red,
      darkRed: darkRed,
      contrast: contrast,
    },
    primary: {
      main: primary,
      light: "#1565c0",
      //   main: darkBlue,
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
      default: "#ffffff",
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
      fontWeight: 400,
    },
  },
});
