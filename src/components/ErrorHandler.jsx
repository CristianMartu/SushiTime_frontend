import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyErrorDetails } from "../redux/actions";
import { Alert, Box, Slide } from "@mui/material";

const ErrorHandler = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error.message);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(emptyErrorDetails());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (!error) return null;

  return (
    <Slide direction="up" in={!!error} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: "5vh",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <Alert
          severity="error"
          onClose={() => dispatch(emptyErrorDetails())}
          sx={{
            width: "80%",
            maxWidth: "600px",
            fontSize: 17,
            border: "1px solid",
            borderColor: (theme) => theme.palette.common.darkRed,
          }}
        >
          {error}
        </Alert>
      </Box>
    </Slide>
  );
};

export default ErrorHandler;
