import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import { useEffect, useState } from "react";
import Profile from "./components/admin/Profile";
import UsersPage from "./components/admin/UsersPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./redux/actions";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await dispatch(fetchCurrentUser());
      } catch (error) {
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch, navigate]);

  if (loading) {
    return null;
  }

  const isUserRoute =
    location.pathname.startsWith("/menu") ||
    location.pathname.startsWith("/history") ||
    location.pathname.startsWith("/exit");

  return (
    <div>
      {isUserRoute ? <MyNavbar /> : <HomeNavbar />}
      <Outlet />
    </div>
  );
};

function App() {
  useEffect(() => {
    localStorage.setItem("adminPassword", "1234");
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorHandler />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/history" element={<History />} />
            <Route path="/exit" element={<Exit />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/tables" element={<MyTable />} />
            <Route path="/products" element={<Product />} />
            <Route path="/orderDetail" element={<OrderDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
