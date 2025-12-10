import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";
import Home from "../Pages/Home/Home";


import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Register from "../Pages/Auth/Register/Register";
import AuthLayout from "../Layout/AuthLayout";
import MainLayout from "../Layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
  },
  
  {
    path: 'home',
    element: <Home></Home>
  },
  {
    path: '/',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
    path: 'login',
    element: <Login></Login>
  },
  {
    path: 'register',
    element: <Register></Register>
  }
    ]
    
  },
  {
    path: 'dashboard',
    element: <DashboardHome></DashboardHome>
  }
]);

export default router