import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Table from "./components/Table";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "bootstrap/js/src/tooltip.js"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "./style.css";
import "@fontsource/ibm-plex-sans-thai";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <App />
      </>
    ),
  },
  {
    path: "/book",
    element: (
      <>
        <Navbar />
        <Table />
      </>
    ),
  },
]);

const root = createRoot(document.querySelector("#root"));
root.render(<RouterProvider router={router} />);
