import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Menu from "./components/Menu";
import MyHome from "./components/MyHome";

function App() {
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
