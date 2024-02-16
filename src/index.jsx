import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import FirebaseAuthProvider from './contexts/ProvideAuthContext';
import routes from './routes/routes';

import './styles/index.css';
import GlobalStyle from './styles/GlobalStyle';

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <FirebaseAuthProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </FirebaseAuthProvider>
  </>,
);
