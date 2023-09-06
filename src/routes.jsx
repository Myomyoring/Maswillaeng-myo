import Layout from './Layout';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFound from './pages/NotFoundPage';
import UserPage from './pages/UserPage';
import BoardWritePage from './pages/BoardWritePage';
import BoardModifyPage from './pages/BoardModifyPage';

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <BoardListPage /> },
      { path: '/boardwrite', element: <BoardWritePage /> },
      { path: '/board/:postId', element: <BoardDetailPage /> },
      { path: '/boardmodify/:postId', element: <BoardModifyPage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/user/:nickname', element: <UserPage /> },
    ],
    errorElement: <NotFound />,
  },
];

export default routes;
