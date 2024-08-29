import { useRoutes } from "react-router-dom";
import Game from "./views/Game";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

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
    }
  ])
}