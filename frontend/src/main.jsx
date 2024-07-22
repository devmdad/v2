import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { MyProvider } from "./context/MyContext";
import { RouterProvider } from "react-router-dom";
import '@radix-ui/themes/styles.css';
import { createRoot } from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyProvider>
        <Theme>
          <App />
        </Theme>
    </MyProvider>
  </React.StrictMode>
);
