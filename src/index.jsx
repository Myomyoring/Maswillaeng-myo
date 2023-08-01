import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.jsx'
import './style/index.css'
import GlobalStyle from './style/GlobalStyle'

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
      <RouterProvider router={router} />
  </React.StrictMode>
)