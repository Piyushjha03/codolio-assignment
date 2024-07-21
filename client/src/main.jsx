import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/home.jsx";
import Transaction from "./pages/transaction.jsx";
import { Charts } from "./pages/charts.jsx";
import Code from "./pages/code.jsx";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
      {
        path: "charts",
        element: <Charts />,
      },
      {
        path: "code",
        element: <Code />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
