import BoardDetailPage from '../pages/BoardDetailPage';
import BoardListPage from '../pages/BoardListPage';
import BoardWritePage from '../pages/BoardWritePage';
import Layout from '../Layout';
import NotFound from '../pages/NotFoundPage';
import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';
import UserPage from '../pages/UserPage';
import PrivateRoute from '../auth/PrivateRoute';
import PublicRoute from '../auth/PublicRoute';

const routes = [
  {
    element: <Layout />,
    path: '/',
    children: [
      { index: true, element: <BoardListPage /> },
      {
        path: 'boardWrite',
        element: (
          <PrivateRoute>
            <BoardWritePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'board/:postId',
        element: (
          <PrivateRoute>
            <BoardDetailPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'boardModify/:postId',
        element: (
          <PrivateRoute>
            <BoardWritePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'user/:nickname',
        element: (
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'signUp',
        element: (
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: 'logIn',
    element: (
      <PublicRoute>
        <LogInPage />
      </PublicRoute>
    ),
  },
];

export default routes;
