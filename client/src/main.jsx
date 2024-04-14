import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppHomepage from "./pages/AppHomepage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import DiaryHomePage from "./pages/DiaryHomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { DataProvider } from "./contexts/DataContext.jsx";
import NewEntryPage from "./pages/NewEntryPage.jsx";
import ModifyOldEntry from "./components/ModifyOldEntry.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppHomepage />,
    children: [
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/diary",
        children: [
          { path: "", element: <DiaryHomePage /> },
          {
            path: "newEntry",
            element: <NewEntryPage />,
          },
          { path: ":id", element: <ModifyOldEntry /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
