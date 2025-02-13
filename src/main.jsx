import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx"
import QuemSomos from "./pages/QuemSomos/QuemSomos.jsx"
import Noticias from "./pages/Noticias/Noticias.jsx"
import Germinar from "./pages/Germinar/GerminarPage.jsx"
import Apoiadores from "./pages/Apoiadores/Apoiadores.jsx"
import RedesSociais from './pages/RedesSociais/RedesSociais.jsx'
import Galeria from './pages/Galeria/Galeria.jsx'
import NewsForm from './admin/NewsForm/NewsForm.jsx'



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
       path: "GerminarPage",
       element: <Germinar/>
      },

      {
        path: "apoiadores",
        element: <Apoiadores/>,
      },
      {
      path: "RedesSociais",
      element: <RedesSociais/>,
      },
      {
      path: "Galeria",
      element: <Galeria/>,
      },
      {
        path: "news-form",
        element: <NewsForm/>
      }

    ]
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
