import { useRoutes } from "react-router-dom";
import Game from "./views/Game";

export default function App(){
  return useRoutes([
    {
      path: '/',
      element: <>Home</>
    },
    {
      path: '/play-game',
      element: <Game />
    }
  ])
}