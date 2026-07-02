import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// HashRouter (לא BrowserRouter) כדי שניווט וריענון בין מסכים יעבדו נכון על GitHub Pages,
// ששרת אתרים סטטיים ולא יודע לנתב נתיבים כמו /profile ישירות.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
