import { useNavigate } from 'react-router-dom';

export function Navi() {
  const navigation = useNavigate();

  return {
    currentPath: window.location.pathname,
    navi: (path) => navigation(path),
    authNavi: (path) => navigation(path, { replace: true }),
    renderNavi: (path) => window.location.replace(path),
  };
}
