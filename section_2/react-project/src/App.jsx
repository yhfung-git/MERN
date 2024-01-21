import { Routes, Route, Navigate } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Users />} />
      <Route path="/places/new" exact element={<NewPlace />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
