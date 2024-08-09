import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/user/MyNavbar";
import Menu from "./components/user/Menu";
import History from "./components/user/History";
import Exit from "./components/user/Exit";
import HomeNavbar from "./components/admin/HomeNavbar";
import Order from "./components/admin/Order";
import MyTable from "./components/admin/MyTable";
import Product from "./components/admin/Product";
import ErrorHandler from "./components/ErrorHandler";
import OrderDetail from "./components/admin/OrderDetail";
import Login from "./components/Login";
import { useEffect } from "react";
import Profile from "./components/admin/Profile";
import UsersPage from "./components/admin/UsersPage";

const Layout = () => (
  <div>
    <MyNavbar />
    <Outlet />
  </div>
);

const Layout2 = () => (
  <div>
    <HomeNavbar />
    <Outlet />
  </div>
);

function App() {
  useEffect(() => {
    localStorage.setItem("adminPassword", "1234");
  }, []);

  return (
    <BrowserRouter>
      <ErrorHandler />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/history" element={<History />} />
          <Route path="/exit" element={<Exit />} />
        </Route>
        <Route element={<Layout2 />}>
          <Route path="/orders" element={<Order />} />
          <Route path="/tables" element={<MyTable />} />
          <Route path="/products" element={<Product />} />
          <Route path="/orderDetail" element={<OrderDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
