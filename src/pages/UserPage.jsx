import React from 'react';

export default function UserPage() {
  const handlerDelete = async () => {
    let confirm = window.confirm('정말 탈퇴하시겠습니까?');

    if (confirm === true) {
      await axios
        .delete(`/api/user`)
        .then((res) => {
          if (res.status === 200) {
            axios.post(`/api/auth/logout`, {});
            alert('이용해주셔서 감사합니다.');
          } else {
            alert('탈퇴를 처리하는 중 문제가 생겼습니다.');
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (confirm === false) {
      return;
    }
  };

  return (
    <>
      <button onClick={handlerDelete}>회원탈퇴</button>
    </>
  );
}
