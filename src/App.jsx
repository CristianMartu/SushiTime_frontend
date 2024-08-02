import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Menu from "./components/Menu";
import { useEffect } from "react";
import History from "./components/History";
import Exit from "./components/Exit";
import Home from "./components/Home";
import Order from "./components/admin/Order";
import MyTable from "./components/admin/MyTable";
import Product from "./components/admin/Product";

const Layout = () => (
  <div>
    <MyNavbar />
    <Outlet />
  </div>
);

const Layout2 = () => (
  <div>
    <Home />
    <Outlet />
  </div>
);

function App() {
  useEffect(() => {
    const myKey =
      "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjI2MDI3NjcsImV4cCI6MTcyMzIwNzU2Nywic3ViIjoiMmYyNDE5MzQtMGYyNS00M2I2LTg1ZTQtNGZjMzcwYmQ5YjcyIn0.cJOwj75nAjetsBrk6KlfMPUQnyCACnOdl7RjfwkfK7TYr8zo2e4lB-_EY7h6FXNjqaiwL4Rp8dgPJ130QOVPHA";
    localStorage.setItem("authToken", myKey);
    localStorage.setItem("adminPassword", "");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Menu />} />
          <Route path="/history" element={<History />} />
          <Route path="/exit" element={<Exit />} />
        </Route>
        <Route element={<Layout2 />}>
          <Route path="/orders" element={<Order />} />
          <Route path="/tables" element={<MyTable />} />
          <Route path="/products" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
