import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Menu from "./components/Menu";
import MyHome from "./components/MyHome";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const myKey =
      "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjE5ODU3MzQsImV4cCI6MTcyMjU5MDUzNCwic3ViIjoiMjE4NTA4OTEtMDM0Yy00Y2UyLTgyMDMtYTdiZDFkZmUwNGE1In0.hyeYokcWlybBjvxQHpySZr2C_wxH4XH1qQgkLb6bLo_GPdwKjuhDOphUd-nW1LMtDBGHz5e5lXdhliTRrF04Lg";
    localStorage.setItem("authToken", myKey);
  }, []);

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<MyHome />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
