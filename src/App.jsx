import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Menu from "./components/Menu";
import { useEffect } from "react";
import History from "./components/History";
import Exit from "./components/Exit";

function App() {
  useEffect(() => {
    const myKey =
      "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjI2MDI3NjcsImV4cCI6MTcyMzIwNzU2Nywic3ViIjoiMmYyNDE5MzQtMGYyNS00M2I2LTg1ZTQtNGZjMzcwYmQ5YjcyIn0.cJOwj75nAjetsBrk6KlfMPUQnyCACnOdl7RjfwkfK7TYr8zo2e4lB-_EY7h6FXNjqaiwL4Rp8dgPJ130QOVPHA";
    localStorage.setItem("authToken", myKey);
  }, []);

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/history" element={<History />} />
        <Route path="/exit" element={<Exit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
