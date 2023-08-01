import Layout from "./Layout";
import BoardListPage from "./pages/BoardListPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFoundPage";

const routes = ([
{
    element: <Layout />,
    children: [
        { path: '/', element: <BoardListPage /> },
        { path: '/signin', element: <SignInPage /> },
        { path: '/signup', element: <SignUpPage /> },

    ],
    errorElement: <NotFound />,
},
]);

export default routes;