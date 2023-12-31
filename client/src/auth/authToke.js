import { useState } from "react";
export const fetchAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    return tokenString;
  };

  const [token, setToken] = useState(getToken());
  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };
  return {
    setToken: saveToken,
    token,
  };
}
