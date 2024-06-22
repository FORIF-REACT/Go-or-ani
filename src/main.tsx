import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './Fonts/Font.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BettingResult from "./pages/betting-result/index.tsx";
import Admin from "./pages/admin/index.tsx";
import UserAdd from "./pages/admin/UserAdd.tsx";
import UserModify from "./pages/admin/UserModify.tsx";
import BetModify from "./pages/admin/BetModify.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import Profile from "./pages/profile/index.tsx"; 
import Create from "./pages/create-betting/create.tsx"; 
import BettingList from './pages/betting-list/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Admin Page
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

      // bettingresult Page
      {
        path: "/result",
        element: <BettingResult />
      },

      // Profile Page
      {
        path: "/profile/:userId",
        element: <Profile />
      },

      // Create Page
      {
        path: "/create",
        element: <Create />
      },
      
      // Login Page
      // {
      //   path: "/login",
      //   element: <Login />
      // },

      //Betting List Page
      {
        path: "/bettinglist",
        element: <BettingList/>
      },
      
      // default Main Page
      // {
      //   path: "/",
      //   element: <Home />
      // }
      
    ]
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
