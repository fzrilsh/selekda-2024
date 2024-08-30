import { useRoutes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashbaord from "./views/Dashboard";
import AdminDashboard from "./views/AdminDashboard";

export default function App(){
  return useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/dashboard',
      element: <Dashbaord />
    },
    {
      path: '/admin',
      element: <AdminDashboard />
    }
  ])
}