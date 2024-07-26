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
      "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjE3MjM1MjMsImV4cCI6MTcyMjMyODMyMywic3ViIjoiMmYyNDE5MzQtMGYyNS00M2I2LTg1ZTQtNGZjMzcwYmQ5YjcyIn0.EUNt42jE55VGjtzI5_raSTMt_vGQeXZ357-j1z6Jy1n9cUsG1LIaD5hdaFaDU4zYkkyRwzFPQdWL-UMd9sQ7VQ";
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
