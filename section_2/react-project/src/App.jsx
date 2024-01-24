import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./shared/context/auth-context";
import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace/NewPlace";
import UserPlaces from "./places/pages/UserPlaces/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace/UpdatePlace";
import Auth from "./user/pages/Auth/Auth";
import "./App.css";

const App = () => {
  const auth = useContext(AuthContext);
  const routes = auth.isLoggedIn ? (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/places/new" element={<NewPlace />} />
      <Route path="/places/:placeId" element={<UpdatePlace />} />
      <Route path="/:userId/places" element={<UserPlaces />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/:userId/places" element={<UserPlaces />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );

  return (
    <>
      <MainNavigation />
      <main>{routes}</main>
    </>
  );
};

export default App;
