import Layout from './Layout';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFound from './pages/NotFoundPage';
import UserPage from './pages/UserPage';

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <BoardListPage /> },
      { path: '/board', element: <BoardDetailPage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/mypage', element: <UserPage /> },
    ],
    errorElement: <NotFound />,
  },
];

export default routes;
