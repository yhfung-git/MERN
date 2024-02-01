import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";

import { AuthContext } from "./shared/context/auth-context";
import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import "./App.css";

const Users = lazy(() => import("./user/pages/Users"));
const NewPlace = lazy(() => import("./places/pages/NewPlace/NewPlace"));
const UserPlaces = lazy(() => import("./places/pages/UserPlaces/UserPlaces"));
const UpdatePlace = lazy(() =>
  import("./places/pages/UpdatePlace/UpdatePlace")
);
const Auth = lazy(() => import("./user/pages/Auth/Auth"));

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
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          {routes}
        </Suspense>
      </main>
    </>
  );
};

export default App;
