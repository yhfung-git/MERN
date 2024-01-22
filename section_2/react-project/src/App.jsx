import { Routes, Route, Navigate } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace/NewPlace";
import UserPlaces from "./places/pages/UserPlaces/UserPlaces";
import "./App.css";

const App = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
