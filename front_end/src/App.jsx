import { useRoutes } from "react-router-dom";

export default function App(){
  return useRoutes([
    {
      path: '/',
      element: <>Home</>
    },
    {
      path: '/game',
      
    }
  ])
}