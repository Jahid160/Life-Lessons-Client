import { createBrowserRouter } from "react-router";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: 'login',
    element: <Login></Login>
  }
]);

export default router