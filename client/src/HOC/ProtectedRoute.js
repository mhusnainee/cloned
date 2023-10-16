import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { fetchAuthToken } from "../auth/authToke";
import { useState } from "react";
const ProtectedRoute = () => {
  const [user] = useState(fetchAuthToken);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
