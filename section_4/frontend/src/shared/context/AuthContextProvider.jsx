import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { useHttpClient } from "../hooks/http-hook";

let logoutTimer;

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [expiration, setExpiration] = useState();
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const login = useCallback((uid, expiration) => {
    expiration = expiration || Date.now() + 1000 * 60 * 60;
    setIsLoggedIn(true);
    setUserId(uid);
    setExpiration(expiration);

    localStorage.setItem(
      "data",
      JSON.stringify({ loggedIn: "true", expiration })
    );
  }, []);

  const logout = useCallback(async () => {
    const response = await sendRequest(
      `${import.meta.env.VITE_BASE_URL}/users/logout`
    );
    if (response !== null) {
      setIsLoggedIn(false);
      setUserId(null);
      setExpiration(null);

      localStorage.removeItem("data");
      navigate("/auth");
    }
  }, [navigate, sendRequest]);

  useEffect(() => {
    expiration
      ? (logoutTimer = setTimeout(logout, expiration - Date.now()))
      : clearTimeout(logoutTimer);

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [expiration, logout]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const data = JSON.parse(localStorage.getItem("data"));

      if (data?.loggedIn === "true" && data?.expiration > Date.now()) {
        const response = await sendRequest(
          `${import.meta.env.VITE_BASE_URL}/users/auth-status`
        );

        if (response !== null) login(response.userId, data.expiration);
      }
    };
    checkAuthStatus();
  }, [sendRequest, login]);

  const authContextValue = {
    isLoggedIn,
    userId,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
