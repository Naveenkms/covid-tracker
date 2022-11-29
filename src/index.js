import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./errorPage";
import App from "./App";
import Vaccine from "./Vaccine";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>
  },
  {
    path: "vaccine",
    element: <Vaccine />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
