import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";

const AuthContextProvider = (props) => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const login = useCallback(
    (uid, token) => {
      setToken(token);
      setUserId(uid);
      navigate("/");
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    navigate("/auth");
  }, [navigate]);

  const authContextValue = {
    isLoggedIn: !!token,
    token,
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
