import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx"
import QuemSomos from "./pages/QuemSomos/QuemSomos.jsx"
import Noticias from "./pages/Noticias/Noticias.jsx"
import GerminarPage from "./pages/Germinar/GerminarPage.jsx"
import Apoiadores from "./pages/Apoiadores/Apoiadores.jsx"
import RedesSociais from './pages/RedesSociais/RedesSociais.jsx'
import Galeria from './pages/Galeria/Galeria.jsx'
import NewsForm from './admin/NewsForm/NewsForm.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'

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
        path: "germinar-page",
        element: <GerminarPage />
      },
      
      {
        path: "apoiadores",
        element: <Apoiadores/>,
      },
      {
      path: "redesSociais",
      element: <RedesSociais/>,
      },
      {
      path: "galeria",
      element: <Galeria/>,
      },
      {
        path: "news-form",
        element: <NewsForm/>
      },
        {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      }
      
    ]
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
