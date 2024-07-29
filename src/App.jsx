import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Menu from "./components/Menu";
import MyHome from "./components/MyHome";
import { useEffect } from "react";
import History from "./components/History";

function App() {
  useEffect(() => {
    const myKey =
      "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjE5OTcyMjEsImV4cCI6MTcyMjYwMjAyMSwic3ViIjoiMmYyNDE5MzQtMGYyNS00M2I2LTg1ZTQtNGZjMzcwYmQ5YjcyIn0.KTgSIpclyjHysQJx6mCcA5Jk-QmPurOZPyCJoIyPkqx4Y2kvVtZUsn7ZSSoBgSc_4Xu3XVbgo2pOeFqwIBUUmA";
    localStorage.setItem("authToken", myKey);
  }, []);

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<MyHome />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
