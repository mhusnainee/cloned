/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import ProtectedRoute from "./HOC/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Eor from "./component/Eor";
import NotRestrictedPage from "./component/NotRestrictedPage";
import useToken from "./auth/authToke";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getTheme } from "./store/themeSlice";
import { getLoading } from "./store/loadingSlice";
import Loading from "./component/Leaves/Loading";

function App() {
  const { token, setToken } = useToken();
  const theme = useSelector(getTheme);
  const loading = useSelector(getLoading);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index path="/*" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Eor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restricted" element={<NotRestrictedPage />} />
      </Routes>
      <Loading loading={loading} />
    </>
  );
}

export default App;
