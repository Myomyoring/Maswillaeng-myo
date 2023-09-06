import React from 'react';
import ReactDOM from 'react-dom/client';
import routes from './routes.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/ProvideAuthContext.jsx';
import './styles/index.css';
import GlobalStyle from './styles/GlobalStyle';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
