import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";

import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Register from "../Pages/Auth/Register/Register";
import AuthLayout from "../Layout/AuthLayout";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home/Home/Home";
import AddLesson from "../Pages/AddLesson/AddLesson";
import Pricing from "../Pages/Pricing/Pricing";
import PrivateRoute from "./PrivateRoute";
import Error404Page from "../Component/ErrorPage/Error404Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pricing",
        element: (
          <PrivateRoute>
            <Pricing></Pricing>
          </PrivateRoute>
        ),
      },
    ],
  },

  // authLayout page
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },

  // dashboard related page
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // {
      //   index: true,
      //   element: <PrivateRoute>
      //     <DashboardHome></DashboardHome>
      //   </PrivateRoute>
      // },
      {
        path: "add-lesson",
        element: (
          <PrivateRoute>
            <AddLesson></AddLesson>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "error",
    element: <Error404Page></Error404Page>,
  },
]);

export default router;
