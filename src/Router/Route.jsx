import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";

import Register from "../Pages/Auth/Register/Register";
import AuthLayout from "../Layout/AuthLayout";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home/Home/Home";
import AddLesson from "../Pages/AddLesson/AddLesson";

import PrivateRoute from "./PrivateRoute";
import Error404Page from "../Component/ErrorPage/Error404Page";
import MyLessons from "../Pages/Dashboard/MyLessons/MyLessons";
import UpdateLesson from "../Pages/Dashboard/UpdateLesson/UpdateLesson";
import LessonCard from "../Pages/Home/LifeLessons/PublicLessons/LessonCard";
import LessonDetails from "../Pages/Dashboard/LessonDetails/LessonDetails";
import LessonCardDetails from "../Pages/Home/LifeLessons/PublicLessons/LessonCardDetails";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import MyProfile from "../Pages/MyProfile/MyProfile";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageLessons from "../Pages/Dashboard/ManageLessons/ManageLessons";
import ReportedLessons from "../Pages/Dashboard/ReportedLessons/ReportedLessons";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import PremiumUpgrade from "../Pages/PremiumUpgrade/PremiumUpgrade";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel/PaymentCancel";
import MyFavorites from "../Pages/Dashboard/MyFavorites/MyFavorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/life-lessons",
        element: <LessonCard></LessonCard>,
      },
      {
        path: "/life-lessons/details/:id",
        element: (
          <PrivateRoute>
            <LessonCardDetails></LessonCardDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "/profile/:email",
        element: (
          <PrivateRoute>
            <ProfilePage></ProfilePage>
          </PrivateRoute>
        ),
      },
      {
        path: "premium-upgrade",
        element: (
          <PrivateRoute>
            <PremiumUpgrade></PremiumUpgrade>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/payment-cancel",
        element: <PaymentCancel></PaymentCancel>,
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
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "add-lesson",
        element: <AddLesson></AddLesson>,
      },
      {
        path: "my-lessons",
        element: <MyLessons />,
      },

      // {
      //   path: 'lesson-details/:id',
      //   element: <PrivateRoute>
      //     <LessonDetails></LessonDetails>
      //   </PrivateRoute>
      // },
      {
        path: "my-lessons/update-lesson/:id",
        element: <UpdateLesson></UpdateLesson>,
      },
            {
        path: 'profile/:email',
        element: <MyProfile></MyProfile>
      },

      // admin only routes
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites></MyFavorites>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-lessons",
        element: (
          <AdminRoute>
            <ManageLessons></ManageLessons>
          </AdminRoute>
        ),
      },
      {
        path: "admin/reported-lessons",
        element: (
          <AdminRoute>
            <ReportedLessons></ReportedLessons>
          </AdminRoute>
        ),
      },
      {
        path: "admin/profile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "my-favorites",
        element: <ManageUsers></ManageUsers>,
      },
    ],
  },
  {
    path: "error",
    element: <Error404Page></Error404Page>,
  },
]);

export default router;
