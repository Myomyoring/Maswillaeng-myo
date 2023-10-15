import { Outlet } from 'react-router-dom';

import Header from './components/common/Header';

export default function App() {
  // const { checker } = useAuth();
  // useEffect(() => {
  //   checker();
  // }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
