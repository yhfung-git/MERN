import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(() => {
    setIsLoggedIn(true);
    navigate("/");
  }, [navigate]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    navigate("/auth");
  }, [navigate]);

  const authContextValue = {
    isLoggedIn,
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
