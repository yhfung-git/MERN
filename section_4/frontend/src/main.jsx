import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AuthContextProvider from "./shared/context/AuthContextProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);
