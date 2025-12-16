import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";


import Register from "../Pages/Auth/Register/Register";
import AuthLayout from "../Layout/AuthLayout";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home/Home/Home"
import AddLesson from "../Pages/AddLesson/AddLesson";
import Pricing from "../Pages/Pricing/Pricing";
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
        path: '/life-lessons',
        element:<LessonCard></LessonCard>
      },
      {
        path: '/life-lessons/details/:id',
        element: <PrivateRoute>
          <LessonCardDetails></LessonCardDetails>
        </PrivateRoute>
      },
      {
        path: 'profile/user/:email',
        element: <PrivateRoute>
          <ProfilePage></ProfilePage>
        </PrivateRoute>
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
      {
        index: true,
        element: <PrivateRoute>
          <DashboardHome></DashboardHome>
        </PrivateRoute>
      },
      {
        path: "add-lesson",
        element: <AddLesson></AddLesson>,
      },
      {
        path: "my-lessons",
        element: <MyLessons />,
      },
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>
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

      // admin only routes
      {
        path: "users-management",
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
    ],
  },
  {
    path: "error",
    element: <Error404Page></Error404Page>,
  },
]);

export default router;
