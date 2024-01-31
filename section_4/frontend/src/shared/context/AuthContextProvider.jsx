import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const login = useCallback(
    (uid) => {
      setIsLoggedIn(uid);
      setUserId(uid);
      navigate("/");
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setIsLoggedIn(null);
    setUserId(null);
    navigate("/auth");
  }, [navigate]);

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
