import { useNavigate } from 'react-router-dom';

export const useRouter = () => {
  const navigation = useNavigate();

  return {
    currentPath: window.location.pathname,
    routeTo: (path) => navigation(path),
    authRouteTo: (path) => navigation(path, { replace: true }),
    renderRouteTo: (path) => window.location.replace(path),
  };
};
