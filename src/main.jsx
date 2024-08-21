import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";
import { GlobalScrollbarStyles } from "./style/style.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import ErrorHandler from "./components/ErrorHandler.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalScrollbarStyles />
      <ErrorHandler />
      <App />
    </ThemeProvider>
  </Provider>
);
