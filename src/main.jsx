import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx"
import QuemSomos from "./pages/QuemSomos/QuemSomos.jsx"
import Noticias from "./pages/Noticias/Noticias.jsx"
import Germinar from "./pages/Germinar/Germinar.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "quem-somos",
        element: <QuemSomos/>,
      },
      {
        path: "noticias",
        element: <Noticias/>,
      },
      {
        path: "germinar",
        element: <Germinar/>,
      }
    ]
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
