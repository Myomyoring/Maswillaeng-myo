import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { FireAuthProvider } from './context/ProvideAuthContext';
import routes from './routes/routes';

import GlobalStyle from './styles/GlobalStyle';
import './styles/index.css';

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FireAuthProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </FireAuthProvider>
  </React.StrictMode>,
);
