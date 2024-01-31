import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { useHttpClient } from "../hooks/http-hook";

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
    localStorage.setItem("loggedIn", "true");
  }, []);

  const logout = useCallback(async () => {
    const response = await sendRequest(
      "http://localhost:5000/api/users/logout"
    );
    if (response !== null) {
      setIsLoggedIn(false);
      setUserId(null);
      localStorage.removeItem("loggedIn");
      navigate("/auth");
    }
  }, [navigate, sendRequest]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const loggedIn = localStorage.getItem("loggedIn");

      if (loggedIn === "true") {
        const response = await sendRequest(
          "http://localhost:5000/api/users/auth-status"
        );

        if (response !== null) login(response.userId);
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
