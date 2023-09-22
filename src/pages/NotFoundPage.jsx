import React from 'react'; // eslint-disable-line no-unused-vars
import { Link, useRouteError } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();
  console.log('errorpage', error);

  return (
    <div>
      <h1>
        {error.statusText} {error.status}
      </h1>
      <Link to={'/'}>▶︎ 메인페이지로 이동하기</Link>
    </div>
  );
}
