import React from "react";
import { useState } from "react";
import { fetchAuthToken } from "../auth/authToke";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const [user] = useState(fetchAuthToken());
  return user.permissions.includes(allowedRoles) ? (
    <Outlet />
  ) : (
    <Navigate to="/restricted" />
  );
};

export default RequireAuth;
