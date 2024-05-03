import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./pages/admin/index.tsx";
//import BettingResult from "./pages/betting-result/index.tsx";
import UserAdd from "./pages/admin/UserAdd.tsx";
import UserModify from "./pages/admin/UserModify.tsx";
import BetModify from "./pages/admin/BetModify.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/adduser",
        element: <UserAdd />,
      },
      {
        path: "/admin/modifyuser",
        element: <UserModify />,
      },
      {
        path: "/admin/modifybet",
        element: <BetModify />,
      },
      {
        path: "/admin",
        element: <Dashboard />,
      },
    ],
  },
  // {
  //   path: "/result",
  //   element: <BettingResult />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
