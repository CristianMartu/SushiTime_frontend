import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyErrorDetails } from "../redux/actions";
import { Alert } from "react-bootstrap";

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
    <div className={`alert-container ${error ? "visible" : "hidden"}`}>
      <Alert variant="danger">{error}</Alert>
    </div>
  );
};

export default ErrorHandler;
