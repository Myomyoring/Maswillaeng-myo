import React from "react";
import { useState } from "react";
const SingleComments = () => {
  const [userImage, setUserImage] = useState("/img/user.jpg");

  return (
    <div className="bg-white flex px-12 py-8 border-t-2">
      <div className="mr-5 h-10 w-10 border-2 rounded-full overflow-hidden">
        <img src={userImage} className="w-10 h-10" alt="" />
      </div>
      <div>
        <div className="flex font-extrabold mb-3 gap-10">
          <div>묘묘</div>
          <div className="text-red-500">2일전</div>
        </div>
        <div className="mb-3">좋은 정보 정말 감사합니다</div>
        <ul className="flex gap-3">
          <li className="font-bold">답글</li>
          <li className="text-gray-500">신고</li>
        </ul>
      </div>
    </div>
  );
};

export default SingleComments;
